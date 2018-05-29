from flask import Flask, flash, redirect, render_template, request, session, abort
from rasa_nlu.model import Metadata, Interpreter
from flask import jsonify
app = Flask(__name__)
from weather import Weather, Unit
weather = Weather(unit=Unit.CELSIUS)
from flask_cors import CORS
from rasa_nlu.training_data import load_data
from rasa_nlu.config import RasaNLUModelConfig
from rasa_nlu.model import Trainer
from rasa_nlu import config
from pymongo import MongoClient
import pprint
import datetime
import json
CORS(app)
@app.route("/")
def index():
    return "Flask App!"

@app.route("/api/<string:projid>/<string:query>/")
def responseGenerator(projid,query):
    db = getMongoDBConnection('chatbot_nlu_training')
    collection = db['training_data_'+projid]
    interpreter = Interpreter.load("F://chatbots/"+projid+"/models/nlu/default/current")
    response = interpreter.parse(query)
    # pprint.pprint(response)
    for data in collection.find({'intent' : response['intent']['name']}):
        pprint.pprint({'rasa_resp' : response })
        return jsonify({'rasa_resp' : response})
@app.route("/train/<string:projid>/")
def train(projid):
    return trainbot(projid)
@app.route("/w")
def w():
    location = weather.lookup_by_location('gurgaon')
    condition = location.condition
    return jsonify(condition.text)
def trainbot(projid):
    db = getMongoDBConnection('chatbot_nlu_training')
    t_data = {'rasa_nlu_data': {'regex_features':[],'entity_synonyms':[],'common_examples' : []}}
    collection = db['training_data_'+projid]
    for intent in collection.find():
        for text in intent['text']:
            # data = t_data['rasa_nlu_data']
            t_data['rasa_nlu_data']['common_examples'].append({'intent' : intent['intent'],'text':text['value'],'entities': text['entities']})

    pprint.pprint(t_data)
    f= open("F://chatbots/"+projid+"/training_data.json","w+")
    f.write(json.dumps(t_data))
    f.close()

    t1_data = load_data("F://chatbots/"+projid+"/training_data.json")
    trainer = Trainer(config.load("F://chatbots/"+projid+"/config.yaml"))
    # trainer = Trainer(RasaNLUConfig("F://chatbots/"+projid+"/config.yaml"))
    trainer.train(t1_data)
    return trainer.persist('F://chatbots/'+projid+'/models/nlu/', fixed_model_name="current")

    
def getMongoDBConnection(db):
    client = MongoClient('localhost', 27017)
    db = client[db]
    return db

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80,threaded=True)
