import { HttpResponse } from '@angular/common/http';
import { ApiService } from 'src/app/core/services/app/api/api.service';
import { toHttpProgress } from 'src/app/core/utils/rx-operators';
import { MediaFile } from 'src/app/core/models/app/media-file';

export function downloadFile(response: HttpResponse<Blob>) {
  const filename = getFilename(response) ?? 'unknown';
  const blob = response.body;

  const a = document.createElement('a');
  a.setAttribute('style', 'display: none');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.rel = 'noopener';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(a.href);
  }, 100);
}

export function getFilename(response: HttpResponse<Blob>) {
  const contentDisposition = response.headers.get('content-disposition')?.split(';');
  const filenameString = contentDisposition?.find(el => el.includes('filename'));
  return filenameString?.split('=')[1].replace(/"/g, '');
}

export function uploadFile<T>(api: ApiService, url: string, form: FormData, media: T & MediaFile) {
  return api
    .post<T>(url, form, {
      observe: 'events',
      reportProgress: true,
    })
    .pipe(toHttpProgress(media));
}
