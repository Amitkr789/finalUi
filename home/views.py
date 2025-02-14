from django.shortcuts import render,redirect
from django.http import JsonResponse
from datetime import datetime
from pathlib import Path
from home.models import RegisterUser
from home.models import CreateLeadModel
# from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from django.core.files.storage import FileSystemStorage
from django.contrib.auth import logout
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Q
# from django.contrib.auth import authenticate, login, logout
import hashlib
import random

# from .models import UserProfile
# Create your views here.
def index(request):
    user_id = request.session.get('user_id')
    if user_id:
        user = RegisterUser.objects.get(id=user_id)
        user_id = user.name
        user_image = user.img
        return render(request,'index.html',{'user': user_id,'ProfilePicture':user_image})
    else:
        return redirect('/login')

def createUser(request):
        userList=RegisterUser.objects.all()
        user_id = request.session.get('user_id')

        if user_id:
            user = RegisterUser.objects.get(id=user_id)
            user_image = user.img
            return render(request, 'createUser.html', {'users': userList,'ProfilePicture':user_image})
        else:
            return redirect('/login')
       

@csrf_exempt
def RegistrationUser(request):
    if request.method =='POST':
        name=request.POST.get('name')
        email=request.POST.get('email')
        phone=request.POST.get('phone')
        password=request.POST.get('password')
        role=request.POST.get('role')
        img=request.FILES.get('image')
        hashPass=hashlib.sha256(password.encode()).hexdigest()

        if RegisterUser.objects.filter(Q(email=email)| Q(phone=phone)).exists():
            return JsonResponse({
                'status':'error','message':'Email or phone all ready exists'
            })
        # check file upload
        if img:
            fs = FileSystemStorage(location=Path(settings.STATICFILES_DIRS[0]) / 'img')
            filename = fs.save(img.name, img)
            image_path = 'img/' + filename
        else:
            image_path= None


        # datetime.today
        registerUser= RegisterUser(name=name,email=email,phone=phone, password=hashPass,role=role,date=datetime.today(),img=image_path)
        registerUser.save()
    return JsonResponse({'status': 'success', 'message': 'Form submitted successfully!'})
    return JsonResponse({'status': 'error', 'message': 'Invalid request'})

def login(request):
    # return render(request, 'login.html')
     user_id = request.session.get('user_id')

     if user_id:
         return redirect('/')
     else:
         return render(request, 'login.html')

@csrf_exempt
def loginAction(request):
     if request.method =='POST':
        emailUser=request.POST.get('userid')
        password=request.POST.get('password')

        try:
            # Check if the user exists
            user = RegisterUser.objects.get(email=emailUser)
            hashed_password = hashlib.sha256(password.encode()).hexdigest()

            #Verify the password
            if user.password == hashed_password:
                request.session['user_id'] = user.id  # Store user ID in session
                return JsonResponse({'status': 'success', 'message': 'Login successful'})
            else:
                return JsonResponse({'status': 'error', 'message': 'Invalid password'})
        except RegisterUser.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'User does not exist'})
        
def LeadManagement(request):
    user_id = request.session.get('user_id')
    if user_id:
        LeadList=CreateLeadModel.objects.all()
        code = random.randint(10000, 99999)
        user = RegisterUser.objects.get(id=user_id)
        user_image = user.img
        return render(request, 'Leadmanagement.html', {'ListLead': LeadList,'UnqId':code,'ProfilePicture':user_image})
    else:
        return redirect('/login')

def LogoutUser(request):
    request.session.flush()
    return redirect('/login')

def MyCalender(request):
    user_id = request.session.get('user_id')
    if user_id:
        user = RegisterUser.objects.get(id=user_id)
        user_image = user.img
        return render(request, 'calender.html',{'ProfilePicture': user_image})
    else:
        return redirect('/login')
    
def MyProfile(request):
    user_id = request.session.get('user_id')
    if user_id:
        return render(request, 'profile.html')
    else:
        return redirect('/login')

def CreateLead(request):
    if request.method =='POST':
        name=request.POST.get('name')
        uniqueId=request.POST.get('uniqueId')
        email=request.POST.get('email')
        phone=request.POST.get('phone')
        status=request.POST.get('status')
        Source=request.POST.get('Source')
        Assigned=request.POST.get('Assigned')
        lcd=request.POST.get('lcd')
        doc=request.POST.get('doc')
        country=request.POST.get('country')
        addnOTE=request.POST.get('addnOTE')

        if CreateLeadModel.objects.filter(Q(email=email)| Q(phone=phone)).exists():
            return JsonResponse({
                'status':'error','message':'Email or phone all ready exists'
            })
        # datetime.today
        CreateLead= CreateLeadModel(name=name,uniqueId=uniqueId,email=email,phone=phone,status=status,Source=Source,Assigned=Assigned,lcd=lcd,doc=doc,country=country,addnOTE=addnOTE)
        CreateLead.save()
    return JsonResponse({'status': 'success', 'message': 'Form submitted successfully!'})