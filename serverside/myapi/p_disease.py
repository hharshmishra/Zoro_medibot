import json
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


def convert_to_bin_array(arr):
    answer = []
    for x in symptoms:
        if x.lower() in arr:
            answer.append(1)
        else:
            answer.append(0)
    return answer


def find_similarity(arr, matrix):
    answer = []
    res = []

    for x in matrix:
        temp = [0, 0, 0]
        for y, z in zip(arr, x):
            if y == 1 and z == 1:
                temp[0] += 1
            elif y == 0 and z == 1:
                temp[1] += 1
            elif y == 1 and z == 0:
                temp[2] += 1

        answer.append(temp)
    for x in answer:
        res.append(x[0] / sum(x))

    return res


def most_probable_disease(similarity_score):
    n = len(similarity_score)
    result = []
    for i in range(n):
        max_val = float('-inf')
        max_pos = float('-inf')
        for j in range(n):
            if similarity_score[j] > max_val:
                max_val = similarity_score[j]
                max_pos = j
        similarity_score[max_pos] = -1
        result.append(max_pos)
    return result


def rearrangeDiseases(arr):
    res = []
    for x in arr:
        res.append(diseases[x])
    return res


def prediction(symptomList):
    bin_array = convert_to_bin_array(symptomList)
    similarity_score = find_similarity(bin_array, diseases_matrix)
    indices_dec = most_probable_disease(similarity_score)
    diseases_predicted = rearrangeDiseases(indices_dec)
    return diseases_predicted, similarity_score[indices_dec[0]] - similarity_score[indices_dec[1]]


def find_unique_symptoms(disease_arr, symptoms_arr):
    ans = []
    dA = diseases.index(disease_arr[0])
    dB = diseases.index(disease_arr[1])
    dC = diseases.index(disease_arr[2])
    i = 0
    for x, y in zip(diseases_matrix[dA], diseases_matrix[dB]):
        if x != y:
            ans.append(i)
        i += 1
    i = 0
    for x, y in zip(diseases_matrix[dA], diseases_matrix[dC]):
        if x != y and i not in ans:
            ans.append(i)
        i += 1
    res = []
    for x in ans:
        res.append(symptoms[x])
    for x in res:
        if x.lower() in symptoms_arr:
            res.pop(res.index(x))
    return res