from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .d_filter import filter_symptoms
from .p_disease import prediction, find_unique_symptoms
from .outputgen import give_result, found_none, request_more, get_remedy


@csrf_exempt
def my_api_view(request):
    data = {
        'message': 'Hello, this is my API!'
    }
    print("received")
    return JsonResponse(data)


@csrf_exempt
def heyzoro(request):
    if request.method == 'POST':
        try:
            # Assuming the request body contains JSON data

            data = json.loads(request.body)
            prompt = data["prompt"]
            symptoms = data['symptoms']
            reqnum = data['reqnum']
            newsym = filter_symptoms(prompt)
            if not newsym:
                message = found_none()
                return JsonResponse({'message': message, 'status': 'in-progress'})
            symptoms.extend(newsym)
            pred, acc = prediction(symptoms)
            pred = pred[:5]

            if reqnum == 5 or acc > 0.1:
                message = give_result(pred[0])
                remedy = get_remedy(pred[0])

                return JsonResponse({'message': message, 'predictions': pred,
                                     'symptoms': symptoms, 'status': 'completed',
                                     'remedy':remedy})

            message = request_more()
            ask = find_unique_symptoms(pred, symptoms)

            return JsonResponse({'message': message, 'predictions': pred,
                                 'symptoms': symptoms, 'status': 'in-progress',
                                 'probable_symptoms': ask})
        except json.JSONDecodeError:
            return JsonResponse({'message': 'Invalid JSON data received'}, status=400)
    else:
        return JsonResponse({'message': 'Only POST requests are allowed'}, status=405)
