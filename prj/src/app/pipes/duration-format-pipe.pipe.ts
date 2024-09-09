import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'durationFormatPipe',
  standalone: true
})
export class DurationFormatPipePipe implements PipeTransform {

  transform(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours === 0) {
      if (remainingMinutes < 10)
        return `00:0${remainingMinutes}`;
      else
        return `00:${remainingMinutes}`;
    }
    else if (remainingMinutes === 0) {
      return `${hours}:00`;
    }
    else {
      if (remainingMinutes < 10)
        return `${hours}:0${remainingMinutes}`;
      else
        return `${hours}:${remainingMinutes}`;
    }
  }
}
