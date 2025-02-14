from django.db import models

# Create userSubmit model
class RegisterUser(models.Model):
    name=models.CharField(max_length=255)
    email=models.CharField(max_length=255)
    phone=models.CharField(max_length=255)
    password=models.CharField(max_length=255)
    role=models.CharField(max_length=122)
    date=models.DateField()
    img=models.ImageField(upload_to='img/',default='img/default.png')

    def __str__(self):
        return self.name
    
class CreateLeadModel(models.Model):
    name=models.CharField(max_length=255)
    uniqueId=models.CharField(max_length=255)
    email=models.CharField(max_length=255)
    phone=models.CharField(max_length=255)
    status=models.CharField(max_length=122)
    Source=models.CharField(max_length=122)
    Assigned=models.CharField(max_length=255)
    lcd=models.CharField(max_length=255)
    doc=models.CharField(max_length=255)
    country=models.CharField(max_length=255)
    addnOTE=models.CharField(max_length=500)

    def __str__(self):
        return self.name

