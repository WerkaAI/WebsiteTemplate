"use client"

import Image from 'next/image'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

interface TutorialImage {
  readonly src: string
  readonly alt: string
  readonly caption?: string
}

interface TutorialImageGalleryProps {
  readonly images: TutorialImage[]
}

export function TutorialImageGallery({ images }: TutorialImageGalleryProps) {
  if (images.length === 0) {
    return null
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {images.map(image => (
        <Dialog key={image.src}>
          <DialogTrigger asChild>
            <button
              type="button"
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              {image.caption && (
                <div className="border-t border-border/60 bg-muted/70 px-4 py-3 text-sm text-muted-foreground">
                  {image.caption}
                </div>
              )}
            </button>
          </DialogTrigger>
          <DialogContent className="w-full max-w-5xl overflow-hidden bg-background p-0">
            <div className="relative h-[min(80vh,700px)] w-full">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
            {image.caption && (
              <p className="px-6 py-4 text-sm text-muted-foreground">{image.caption}</p>
            )}
          </DialogContent>
        </Dialog>
      ))}
    </div>
  )
}
