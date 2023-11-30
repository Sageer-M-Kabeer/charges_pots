# Generated by Django 4.2.1 on 2023-06-11 11:58

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_account_total_income_alter_depositrequest_proof'),
    ]

    operations = [
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(blank=True, max_length=6)),
            ],
        ),
        migrations.RemoveField(
            model_name='referral',
            name='referred_by',
        ),
        migrations.RemoveField(
            model_name='referral',
            name='referred_user',
        ),
        migrations.RemoveField(
            model_name='user',
            name='invite_code',
        ),
        migrations.RemoveField(
            model_name='user',
            name='referral_code',
        ),
        migrations.DeleteModel(
            name='InviteCode',
        ),
        migrations.DeleteModel(
            name='Referral',
        ),
        migrations.AddField(
            model_name='profile',
            name='referred_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='ref_by', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='profile',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]