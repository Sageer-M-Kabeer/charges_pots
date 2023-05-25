from django.contrib.auth.forms import UserChangeForm
from django import forms
from .models import User

# class CustomUserCreationForm(UserCreationForm):

#     class Meta:
#         model = User
#         phone_number = forms.CharField(max_length=14, required=False)
#         password1 = forms.CharField()
#         password2 = forms.CharField()
#         fields = ("phone_number","password1","password2")


class CustomUserChangeForm(UserChangeForm):

    class Meta:
        model = User
        fields = ("phone_number",)



class UserCreateForm(forms.ModelForm):
    captcha_code = forms.CharField(max_length=4, widget=forms.TextInput(attrs={'readonly': 'readonly'}))

    class Meta:
        model = User
        fields = ['phone_number', 'password',  'invite_code']
        widgets = {
            'phone_number': forms.TextInput(attrs={'placeholder': 'Phone Number'}),
            'password1': forms.PasswordInput(attrs={'placeholder': 'Password'}),
            'password2': forms.PasswordInput(attrs={'placeholder': 'Confirm Password'}),
            'invite_code': forms.TextInput(attrs={'placeholder': 'Invite Code'})
        }
        labels = {
            'phone_number': 'Phone Number',
            'password1': 'Password',
            'password2': 'Confirm Password',
            'invite_code': 'Invite Code'
        }
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['password1'].widget.attrs.update({'autocomplete': 'off'})
        self.fields['password2'].widget.attrs.update({'autocomplete': 'off'})
        self.fields['captcha_code'].initial = generate_captcha_code()
    
    def clean_captcha_code(self):
        captcha_code = self.cleaned_data.get('captcha_code')
        if captcha_code != self.initial['captcha_code']:
            raise forms.ValidationError('Invalid captcha code')
        return captcha_code

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
