import os
import requests
from django.utils.deprecation import MiddlewareMixin


class CountryDetectionMiddleware(MiddlewareMixin):
    def process_request(self, request):
        if not request.path.startswith('/api/my-country-weather/'):
            return None

        try:
            # En production, utiliser l'IP réelle
            if os.getenv('DEBUG', 'False') == 'False':
                ip = request.META.get('HTTP_X_FORWARDED_FOR') or request.META.get('REMOTE_ADDR')
                if ip == '127.0.0.1':
                    ip = requests.get('https://api.ipify.org').text

                # Utiliser un service gratuit pour la géolocalisation
                response = requests.get(f'http://ip-api.com/json/{ip}')
                data = response.json()

                if data['status'] == 'success':
                    request.META['HTTP_X_COUNTRY'] = data['country']
                    request.META['HTTP_X_CITY'] = data['city']
                else:
                    request.META['HTTP_X_COUNTRY'] = 'Senegal'
                    request.META['HTTP_X_CITY'] = 'Dakar'

        except Exception:
            request.META['HTTP_X_COUNTRY'] = 'Senegal'
            request.META['HTTP_X_CITY'] = 'Dakar'

        return None