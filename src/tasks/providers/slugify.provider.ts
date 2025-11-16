import { Injectable } from '@nestjs/common';
import slugify from 'slugify';

@Injectable()
export class SlugifyProvider {
async generateUniqueSlug( title: string) {
    const baseSlug = slugify(title, { lower: true, strict: true });

    const timestamp = Date.now();
    const randomIndex = Math.floor(Math.random() * baseSlug.length);

    const uniqueSlug = `${baseSlug.slice(0, randomIndex)}${timestamp}${baseSlug.slice(randomIndex)}`;

    return uniqueSlug;
  }
}
