# Generated by Django 4.2.1 on 2023-06-03 11:22

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='VipLevel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('level', models.IntegerField(unique=True)),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('daily_income', models.DecimalField(decimal_places=2, max_digits=10)),
                ('total_revenue', models.DecimalField(decimal_places=2, max_digits=10)),
            ],
        ),
        migrations.CreateModel(
            name='Vip',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('circle_days', models.IntegerField()),
                ('level', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='vip.viplevel')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
