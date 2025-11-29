"use client"

import { useState } from "react"
import { Play } from "lucide-react"
import Image from "next/image"

interface VideoPlayerProps {
    src: string
    title: string
    poster?: string
}

export function VideoPlayer({ src, title, poster }: VideoPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false)

    // Extract video ID if it's a YouTube URL for the poster thumbnail fallback
    const getYouTubeId = (url: string) => {
        if (!url) return null;
        try {
            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
            const match = url.match(regExp)
            return match && match[2].length === 11 ? match[2] : null
        } catch (e) {
            console.error("Error parsing YouTube ID:", e);
            return null;
        }
    }

    const videoId = getYouTubeId(src)
    const posterUrl = poster || (videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null)

    if (!isPlaying && posterUrl) {
        return (
            <div
                className="group relative my-8 aspect-video w-full cursor-pointer overflow-hidden rounded-xl border bg-muted shadow-sm transition-all hover:shadow-md"
                onClick={() => setIsPlaying(true)}
            >
                <Image
                    src={posterUrl}
                    alt={title || "Video thumbnail"}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/30">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-background/90 text-primary shadow-lg transition-transform group-hover:scale-110">
                        <Play className="ml-1 h-8 w-8 fill-current" />
                    </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="line-clamp-1 text-lg font-medium text-white drop-shadow-md">{title}</h3>
                </div>
            </div>
        )
    }

    return (
        <div className="my-8 aspect-video w-full overflow-hidden rounded-xl border bg-muted shadow-sm">
            <iframe
                width="100%"
                height="100%"
                src={`${src}${src.includes('?') ? '&' : '?'}autoplay=${isPlaying ? 1 : 0}`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="h-full w-full"
            />
        </div>
    )
}
