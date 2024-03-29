# Generated by Django 4.2.1 on 2023-06-09 14:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='VipLevel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=25, null=True)),
                ('level', models.IntegerField(unique=True)),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('daily_income', models.DecimalField(decimal_places=2, max_digits=10)),
                ('total_revenue', models.DecimalField(decimal_places=2, max_digits=10)),
                ('circle_days', models.IntegerField(null=True)),
                ('is_expired', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Vip',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('level', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='vip.viplevel')),
            ],
        ),
    ]
