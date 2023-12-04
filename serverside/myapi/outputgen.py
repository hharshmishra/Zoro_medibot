import json
import os
from random import randint

file_path_output = os.path.abspath(os.path.join(os.path.dirname(__file__), 'output.json'))
file_path_remedy = os.path.abspath(os.path.join(os.path.dirname(__file__), 'remedy.json'))

with open(file_path_output, 'r') as file:
    output = json.load(file)

with open(file_path_remedy, 'r') as file:
    remedy = json.load(file)

result = output['Result']
none = output['None']
request = output['Request']


def found_none():
    idx = randint(0, 19)
    res = none[idx]
    return res


def give_result(disease_name):
    idx = randint(0, 19)
    res = result[idx]
    out = res.replace("{disease_name}", disease_name)
    return out


def get_remedy(disease_name):
    return remedy[disease_name]


def request_more():
    idx = randint(0, 19)
    res = request[idx]
    return res
