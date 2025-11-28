import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, GraduationCap, PlayCircle } from 'lucide-react'
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
    <Link href={href} onClick={onClick} className="group h-full block">
      <Card className={cn('flex h-full flex-col glass-premium border-0 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden', className)}>
        <div className="relative h-48 w-full overflow-hidden bg-muted">
          {cover ? (
            <Image
              src={cover}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(min-width: 1280px) 400px, (min-width: 768px) 50vw, 100vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center">
              <PlayCircle className="w-12 h-12 text-slate-400 opacity-50" />
            </div>
          )}

          {/* Overlay Badge */}
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="bg-black/50 text-white hover:bg-black/60 backdrop-blur-sm border-0">
              {difficulty}
            </Badge>
          </div>
        </div>

        <CardHeader className="space-y-3 pb-3">
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground font-medium">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" />
              {formatDuration(durationMinutes)}
            </span>
            {publishDate && (
              <>
                <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                  {new Date(publishDate).toLocaleDateString('pl-PL', {
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </>
            )}
          </div>

          <h2 className="text-lg font-bold text-foreground group-hover:text-emerald-600 transition-colors line-clamp-2">
            {title}
          </h2>
        </CardHeader>

        <CardContent className="flex-1 pb-4">
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {description}
          </p>

          <div className="flex flex-wrap gap-2">
            {personas.map(personaLabel => (
              <Badge key={personaLabel} variant="secondary" className="rounded-md bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-300 border-0 font-normal">
                {personaLabel}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardFooter className="pt-0 pb-6 border-t border-border/40 mt-auto pt-4">
          <span className="text-sm font-semibold text-emerald-600 group-hover:underline underline-offset-4 flex items-center gap-1">
            Oglądaj tutorial
          </span>
        </CardFooter>
      </Card>
    </Link>
  )
}
