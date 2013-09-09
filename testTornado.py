import tornado.ioloop
import tornado.web
import logging
import tornado.auth
import tornado.escape
import torndb
import os.path
import uuid

from tornado import gen
from tornado.options import define, options, parse_command_line

define("port", default=8888, help="run on the given port", type=int)
define("mysql_host", default="127.0.0.1:3306", help="blog database host")
define("mysql_database", default="sails", help="blog database name")
define("mysql_user", default="root", help="blog database user")
define("mysql_password", default="root", help="blog database password")

class AuthLoginHandler(tornado.web.RequestHandler, tornado.auth.GoogleMixin):
    @tornado.web.asynchronous
    @gen.coroutine
    def get(self):
        if self.get_argument("openid.mode", None):
            user = yield self.get_authenticated_user()
            self.set_secure_cookie("chatdemo_user",
                                   tornado.escape.json_encode(user))
            self.redirect("/")
            return
        self.authenticate_redirect(ax_attrs=["name"])
        return

		
def singleton(cls):
    return cls("localhost","sails","root","root")


@singleton		
class DataAccessor:

    def __init__(self, host, dbName, user, password):
        self.host = host
        self.dbName = dbName
        self.user = user
        self.password = password
        self.db = tornado.database.Connection(self.host, self.dbName, self.user, self.password)
        return
		
    def getAll(self):
        return self.db.query("SELECT * FROM contacts")

    def addContact(self, firstName, lastName, phoneNumber):
        sql = 'insert into contact(firstName,lastName, phoneNumber) values(\'' + repr(firstName) + '\',\'' + repr(lastName) + '\',\'' + repr(phoneNumber) + '\')'  
        self.db.quuery(sql)
        return 

    def removeContact(self,id):
        sql = "delete from contact where id=" + repr(id)
        self.db.query(sql)
        return
	
class MainHandler(tornado.web.RequestHandler):
    # @tornado.web.authenticated
    def get(self):
        self.render("main.html", messag='toto')
        return

class GetAllContactsHandler(tornado.web.RequestHandler):
    # @tornado.web.authenticated
    def get(self):
        self.write("TODO")
        return
		
class delContactHandler(tornado.web.RequestHandler):
    # @tornado.web.authenticated
    def get(self):
        self.write("TODO")
        return		

class addContactHandler(tornado.web.RequestHandler):
    # @tornado.web.authenticated
    def get(self):
        self.write("TODO")
        return				
		
class Application(tornado.web.Application):
    def __init__(self):
        handlers = [
            (r"/", MainHandler),            
        ]
        settings = dict(
            blog_title=u"Tornado Blog",
            template_path=os.path.join(os.path.dirname(__file__), "templates"),
            static_path=os.path.join(os.path.dirname(__file__), "static"),
            ui_modules={"Entry": EntryModule},
            xsrf_cookies=True,
            cookie_secret="__TODO:_GENERATE_YOUR_OWN_RANDOM_VALUE_HERE__",
            login_url="/auth/login",
            debug=True,
        )
        tornado.web.Application.__init__(self, handlers, **settings)

        # Have one global connection to the blog DB across all handlers
        self.db = torndb.Connection(
            host=options.mysql_host, database=options.mysql_database,
            user=options.mysql_user, password=options.mysql_password)

def main():
    tornado.options.parse_command_line()
    http_server = tornado.httpserver.HTTPServer(Application())
    http_server.listen(options.port)
    tornado.ioloop.IOLoop.instance().start()


if __name__ == "__main__":
    main()