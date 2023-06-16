from django.contrib.auth.forms import UserChangeForm
from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import User


class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = User
        fields = ("phone_number","password")

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['password'].widget = forms.PasswordInput(attrs={'autocomplete': 'new-password'})


class UserCreateForm(UserCreationForm):
    password1 = forms.CharField(label='Password', widget=forms.PasswordInput)
    password2 = forms.CharField(label='Confirm Password', widget=forms.PasswordInput)

    class Meta:
        model = User
        fields = ['phone_number', 'password1', 'password2', 'invite_code']
        widgets = {
            'phone_number': forms.TextInput(attrs={'placeholder': 'Phone Number'}),
            'invite_code': forms.TextInput(attrs={'placeholder': 'Invite Code'})
        }
        labels = {
            'phone_number': 'Phone Number',
            'invite_code': 'Invite Code'
        }
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['password1'].widget.attrs.update({'autocomplete': 'off'})
        self.fields['password2'].widget.attrs.update({'autocomplete': 'off'})
    
    def clean_invite_code(self):
        invite_code = self.cleaned_data.get('invite_code')
        if not User.objects.filter(invite_code=invite_code).exists():
            raise forms.ValidationError('Invalid invite code')
        return invite_code

    def clean(self):
        cleaned_data = super().clean()
        password1 = cleaned_data.get('password1')
        password2 = cleaned_data.get('password2')
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError('Passwords do not match')
        return cleaned_data

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data['password1'])
        if commit:
            user.save()
        return user

