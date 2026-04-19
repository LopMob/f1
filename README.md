# F1 Motion Lab

Интерактивный сайт-аналитика гонок Formula 1 с визуализацией трасс, статистикой пилотов и турнирными таблицами сезона 2024.

## Что умеет сайт

- Интерактивная анимация реальных трасс F1 — болид проезжает круг по GPS-контуру трассы
- Гид по поворотам с маркерами прямо на схеме трассы
- Гид по стратегии гонки для каждой трассы
- Таблица чемпионата пилотов и команд
- Карточки пилотов с биографией и статистикой
- Сравнение двух пилотов лицом к лицу
- Результаты гонок сезона 2024
- Переключение языка RU / EN

## Стек технологий

### Backend
- **Python** — основной язык
- **Flask** — веб-фреймворк, маршрутизация, рендеринг шаблонов
- **Jinja2** — шаблонизатор HTML

### Frontend
- **HTML / CSS / JavaScript** — без фреймворков
- **SVG** — анимация трасс и болида
- **i18n** — самописный переключатель языков EN/RU через localStorage

### Данные
- **FastF1** — Python библиотека для получения данных с серверов Formula 1
- **GeoJSON** — реальные GPS контуры трасс из репозитория bacinger/f1-circuits
- **JSON** — хранение данных о пилотах, трассах, гонках, командах

### Контейнеризация
- **Docker** — упаковка приложения в контейнер
- **Dockerfile** — сборка образа на базе python:3.11-slim

### Оркестрация
- **Kubernetes** — управление контейнерами
- **Helm** — пакетный менеджер для Kubernetes, деплой через chart
- **Minikube** — локальный Kubernetes кластер для разработки

### Облачная инфраструктура
- **Yandex Cloud** — облачная платформа
- **Yandex Managed Kubernetes** — управляемый K8s кластер
- **Yandex Container Registry** — хранение Docker образов
- **Terraform** — Infrastructure as Code, автоматическое создание инфраструктуры

## Структура проекта

```
f1/
├── app.py                  # Flask приложение
├── Dockerfile              # Сборка Docker образа
├── requirements.txt        # Python зависимости
├── .dockerignore
├── data/
│   ├── tracks.json         # Трассы с GPS контурами и гидами
│   ├── drivers.json        # Пилоты и статистика
│   ├── races.json          # Результаты гонок
│   └── constructors.json   # Команды
├── templates/              # Jinja2 HTML шаблоны
├── static/
│   ├── css/style.css
│   ├── js/
│   │   ├── track.js        # Анимация трассы и маркеры поворотов
│   │   └── i18n.js         # Переключение языков
│   └── images/
├── helm/                   # Helm chart для Kubernetes
│   ├── Chart.yaml
│   ├── values.yaml
│   └── templates/
│       ├── deployment.yaml
│       ├── service.yaml
│       ├── ingress.yaml
│       └── hpa.yaml
└── f1-terraform/           # Terraform для Yandex Cloud
    ├── provider.tf
    ├── main.tf
    ├── variables.tf
    └── outputs.tf
```

## Запуск локально

```bash
pip install flask
python app.py
# http://localhost:5001
```

## Запуск в Docker

```bash
docker build -t f1-motion-lab .
docker run -d -p 5001:5001 f1-motion-lab
```

## Деплой в Kubernetes (Minikube)

```bash
minikube start
minikube image load f1-motion-lab:latest
helm install f1 ./helm
kubectl port-forward svc/f1 9090:80
# http://localhost:9090
```

## Деплой в Yandex Cloud

```bash
# Создать инфраструктуру
cd f1-terraform
export TF_VAR_folder_id=<folder_id>
terraform init
terraform apply

# Подключить kubectl
yc managed-kubernetes cluster get-credentials f1-cluster --external

# Запушить образ
yc container registry configure-docker
docker tag f1-motion-lab cr.yandex/<registry_id>/f1-motion-lab:latest
docker push cr.yandex/<registry_id>/f1-motion-lab:latest

# Задеплоить
helm install f1 ./helm --set image.repository=cr.yandex/<registry_id>/f1-motion-lab

# Удалить инфраструктуру
terraform destroy
```
