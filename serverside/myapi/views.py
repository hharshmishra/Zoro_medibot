from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def my_api_view(request):
    data = {
        'message': 'Hello, this is my API!'
    }
    print("received")
    return JsonResponse(data)

@csrf_exempt
def heyzoro(request):
    print("received")
    print(request.body)
    if request.method == 'POST':
        try:
            # Assuming the request body contains JSON data

            data = json.loads(request.body)
            # Process the received data (here we are just echoing the received data)
            return JsonResponse({'message': 'Received POST data successfully', 'data': data})
        except json.JSONDecodeError:
            return JsonResponse({'message': 'Invalid JSON data received'}, status=400)
    else:
        return JsonResponse({'message': 'Only POST requests are allowed'}, status=405)