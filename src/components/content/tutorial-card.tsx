import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, GraduationCap } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export interface TutorialCardProps {
  title: string
  description: string
  persona: string[]
  difficulty: string
  durationMinutes: number
  tags: string[]
  href: string
  className?: string
  publishDate?: string
  cover?: string
  onClick?: () => void
}

function formatDuration(minutes: number) {
  if (!Number.isFinite(minutes)) {
    return '—'
  }
  if (minutes < 60) {
    return `${minutes} min`
  }
  const hours = Math.floor(minutes / 60)
  const remainder = minutes % 60
  return remainder === 0 ? `${hours} h` : `${hours} h ${remainder} min`
}

export function TutorialCard(props: TutorialCardProps) {
  const {
    title,
    description,
    persona,
    difficulty,
    durationMinutes,
    tags,
    href,
    className,
    publishDate,
    cover,
    onClick,
  } = props
  const personas = persona.slice(0, 3)

  return (
    <Card className={cn('flex h-full flex-col overflow-hidden border-border/60 transition-colors hover:border-primary/60', className)}>
      {cover && (
        <div className="relative h-44 w-full overflow-hidden">
          <Image
            src={cover}
            alt={title}
            fill
            className="object-cover"
            sizes="(min-width: 1280px) 400px, (min-width: 768px) 50vw, 100vw"
          />
        </div>
      )}
      <CardHeader className="space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground uppercase tracking-wide">
          {publishDate && (
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
              {new Date(publishDate).toLocaleDateString('pl-PL', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
            </span>
          )}
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {formatDuration(durationMinutes)}
          </span>
          <span className="inline-flex items-center gap-1">
            <GraduationCap className="h-3.5 w-3.5" aria-hidden="true" />
            {difficulty}
          </span>
        </div>
        <h2 className="text-xl font-semibold text-foreground">
          <Link href={href}>{title}</Link>
        </h2>
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          {personas.map(personaLabel => (
            <Badge key={personaLabel} variant="secondary" className="rounded-full bg-primary/10 text-primary">
              {personaLabel}
            </Badge>
          ))}
        </div>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 3).map(tag => (
              <Badge key={tag} variant="outline">#{tag}</Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="mt-auto pt-0">
        <Link
          href={href}
          className="text-sm font-semibold text-primary hover:text-primary/80"
          onClick={onClick}
        >
          Przejdź do tutorialu →
        </Link>
      </CardFooter>
    </Card>
  )
}
