from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .d_filter import filter_symptoms
from .p_disease import prediction


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
            newsym = filter_symptoms(prompt)
            if not newsym:
                pass
            symptoms.extend(newsym)
            pred = prediction(symptoms)[:5]
            print(pred)
            return JsonResponse({'message': 'Received POST data successfully', 'predictions': pred,
                                 'symptoms': symptoms})
        except json.JSONDecodeError:
            return JsonResponse({'message': 'Invalid JSON data received'}, status=400)
    else:
        return JsonResponse({'message': 'Only POST requests are allowed'}, status=405)