import json
import numpy as np
import re
import os

file_path_dsm = os.path.abspath(os.path.join(os.path.dirname(__file__), 'disease_symptom_matrix.json'))
file_path_ld = os.path.abspath(os.path.join(os.path.dirname(__file__), 'lowercase_data.json'))
file_path_uw = os.path.abspath(os.path.join(os.path.dirname(__file__), 'unwanted_words.json'))


with open(file_path_dsm, 'r') as file:
    matrix_data = json.load(file)

with open(file_path_ld, 'r') as file:
    key_data = json.load(file)

with open(file_path_uw, 'r') as file:
    unwanted_data = json.load(file)

data = matrix_data
diseases = data['diseases']
symptoms = data['symptoms']
diseases_matrix = data['matrix']


def filter_symptoms(prompt):
    pattern = r'\b(?:' + '|'.join(map(re.escape, unwanted_data)) + r')\b'
    symptomList = re.findall(pattern, prompt.lower())
    answer = []

    for x in symptomList:
        if x in key_data:
            answer.append(key_data[x])

    return answer


print(filter_symptoms("i have bowel obstruction and also limited range of motion in the joint also stomach ache and hypotension"))

