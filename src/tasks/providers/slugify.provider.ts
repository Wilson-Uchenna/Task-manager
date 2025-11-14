import { Injectable } from '@nestjs/common';
import { ILike, ObjectLiteral, Repository } from 'typeorm';
import slugify from 'slugify';

@Injectable()
export class SlugifyProvider {
async generateUniqueSlug<T extends ObjectLiteral>(repository: Repository<T>, title: string, slugColumn: keyof T): Promise<string> {
    const baseSlug = slugify(title, { lower: true, strict: true });

    const existingItems = await repository.find({
        where: { [slugColumn]: ILike(`${baseSlug}%`) } as any,
        select: [slugColumn as string],
    });

    if (existingItems.length === 0) {
        return baseSlug;
    }

    const slugNumbers = existingItems.map((item) => {
        const match = item[slugColumn].match(new RegExp(`^${baseSlug}-(\\d+)$`));
        return match ? parseInt(match[1], 10) : 0;
    })
    .filter(num => !isNaN(num));
    
    const nextNumber = slugNumbers.length > 0 ? Math.max(...slugNumbers) + 1 : 1;
    return `${baseSlug}-${nextNumber}`;
  }
}
