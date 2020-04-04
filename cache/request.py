from requests import Session, Request
from redis import Redis
import json

db = Redis(host='localhost', port=6379, db=0)

def get(url, parameters=None):
    """ Fetches an URL and returns the response """
    req = Request('GET', url, params=parameters).prepare()

    db_res = db.get(req.url)
    if db_res is not None:
        return json.loads(db_res)
    else:
        res = Session().send(req).json()
        db.set(url, json.dumps(res))
        return res

def post(url, parameters=None, data=None):
    """ Post data to an URL and returns the response """
    return make_altering_request('POST', url, params=parameters, data=data)

def put(url, parameters=None, data=None):
    """ Put data to an resource and returns the response """
    return make_altering_request('PUT', url, params=parameters, data=data)

def patch(url, parameters=None, data=None):
    """ Patches an resource and returns the response """
    return make_altering_request('PATCH', url, params=parameters, data=data)

def delete(url, parameters=None, data=None):
    """ Requests the deletion of an resource and returns the response """
    return make_altering_request('DELETE', url, params=parameters, data=data)

def make_altering_request(method, url, params=None, data=None):
    req = Request(method, url, params=params).prepare()

    db.delete(url)
    return Session().send(req).json()
