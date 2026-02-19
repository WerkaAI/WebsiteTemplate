'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ArrowRight, RotateCcw, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AdventureQuiz, QuizQuestion } from '@/lib/onboarding/onboarding-content';
import { cn } from '@/lib/utils';

interface QuizModalProps {
    quiz: AdventureQuiz;
    isOpen: boolean;
    onClose: () => void;
    onComplete: (xpReward: number) => void;
}

export function QuizModal({ quiz, isOpen, onClose, onComplete }: QuizModalProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const currentQuestion = quiz.questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;

    const handleCheckAnswer = () => {
        if (selectedOption === null) return;

        const isRight = selectedOption === currentQuestion.correctIndex;
        setIsCorrect(isRight);
        setIsAnswered(true);

        if (isRight && isLastQuestion) {
            // Delay showing success screen slightly to let user read explanation if they want?
            // Or show "Finish" button?
        }
    };

    const handleNext = () => {
        if (isLastQuestion) {
            setShowSuccess(true);
        } else {
            setCurrentQuestionIndex((prev) => prev + 1);
            setSelectedOption(null);
            setIsAnswered(false);
            setIsCorrect(false);
        }
    };

    const handleRetry = () => {
        setSelectedOption(null);
        setIsAnswered(false);
        setIsCorrect(false);
    };

    const handleClaimReward = () => {
        onComplete(quiz.xpReward);
        onClose();
        // Reset state for next time (though typically it stays completed)
        setTimeout(() => {
            setShowSuccess(false);
            setCurrentQuestionIndex(0);
            setSelectedOption(null);
            setIsAnswered(false);
        }, 500);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-card w-full max-w-lg rounded-xl shadow-2xl border border-border overflow-hidden flex flex-col max-h-[90vh]"
            >
                {/* Header */}
                <div className="p-4 border-b flex items-center justify-between bg-muted/30">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                        <Award className="w-5 h-5 text-brand-green" />
                        {quiz.title}
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-muted rounded-full transition-colors"
                    >
                        <X className="w-5 h-5 text-muted-foreground" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
                    {showSuccess ? (
                        <div className="text-center py-8">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', bounce: 0.5 }}
                                className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                            >
                                <span className="text-5xl">🏆</span>
                            </motion.div>
                            <h2 className="text-2xl font-bold mb-2 text-foreground">
                                Gratulacje!
                            </h2>
                            <p className="text-muted-foreground mb-8">
                                Ukończyłeś test i udowodniłeś swoją wiedzę.
                            </p>
                            <div className="flex flex-col gap-3">
                                <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 p-4 rounded-lg font-bold text-lg border border-amber-200 dark:border-amber-800">
                                    +{quiz.xpReward} XP
                                </div>
                                <Button
                                    size="lg"
                                    onClick={handleClaimReward}
                                    className="w-full bg-brand-green hover:bg-brand-green/90 text-white font-bold"
                                >
                                    Odbierz nagrodę
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Progress */}
                            <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
                                <span className="font-medium text-foreground">
                                    Pytanie {currentQuestionIndex + 1}
                                </span>
                                <span>/ {quiz.questions.length}</span>
                                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden ml-2">
                                    <div
                                        className="h-full bg-brand-green transition-all duration-300"
                                        style={{
                                            width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%`,
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Question */}
                            <h4 className="text-xl font-semibold mb-6">
                                {currentQuestion.question}
                            </h4>

                            {/* Options */}
                            <div className="space-y-3">
                                {currentQuestion.options.map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() =>
                                            !isAnswered && setSelectedOption(index)
                                        }
                                        disabled={isAnswered}
                                        className={cn(
                                            'w-full p-4 rounded-lg border text-left transition-all relative',
                                            !isAnswered &&
                                            selectedOption === index &&
                                            'border-brand-green bg-brand-green/5 ring-1 ring-brand-green',
                                            !isAnswered &&
                                            selectedOption !== index &&
                                            'hover:border-primary/50 hover:bg-muted/50',
                                            isAnswered &&
                                            index === currentQuestion.correctIndex &&
                                            'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300',
                                            isAnswered &&
                                            selectedOption === index &&
                                            index !== currentQuestion.correctIndex &&
                                            'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300',
                                            isAnswered &&
                                            index !== currentQuestion.correctIndex &&
                                            index !== selectedOption &&
                                            'opacity-50'
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={cn(
                                                    'w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px]',
                                                    !isAnswered &&
                                                        selectedOption === index
                                                        ? 'border-brand-green bg-brand-green text-white'
                                                        : 'border-muted-foreground/30',
                                                    isAnswered &&
                                                    index === currentQuestion.correctIndex &&
                                                    'border-green-500 bg-green-500 text-white',
                                                    isAnswered &&
                                                    selectedOption === index &&
                                                    index !== currentQuestion.correctIndex &&
                                                    'border-red-500 bg-red-500 text-white'
                                                )}
                                            >
                                                {isAnswered &&
                                                    index === currentQuestion.correctIndex ? (
                                                    <Check className="w-3.5 h-3.5" />
                                                ) : isAnswered &&
                                                    selectedOption === index &&
                                                    index !==
                                                    currentQuestion.correctIndex ? (
                                                    <X className="w-3.5 h-3.5" />
                                                ) : (
                                                    String.fromCharCode(65 + index)
                                                )}
                                            </div>
                                            <span className="font-medium">{option}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {/* Feedback & Actions */}
                            <AnimatePresence mode="wait">
                                {isAnswered && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className={cn(
                                            'mt-6 p-4 rounded-lg border',
                                            isCorrect
                                                ? 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800'
                                                : 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800'
                                        )}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div
                                                className={cn(
                                                    'p-1.5 rounded-full mt-0.5',
                                                    isCorrect
                                                        ? 'bg-green-100 text-green-600'
                                                        : 'bg-red-100 text-red-600'
                                                )}
                                            >
                                                {isCorrect ? (
                                                    <Check className="w-4 h-4" />
                                                ) : (
                                                    <X className="w-4 h-4" />
                                                )}
                                            </div>
                                            <div>
                                                <h5
                                                    className={cn(
                                                        'font-bold text-sm mb-1',
                                                        isCorrect
                                                            ? 'text-green-800 dark:text-green-300'
                                                            : 'text-red-800 dark:text-red-300'
                                                    )}
                                                >
                                                    {isCorrect
                                                        ? 'Świetnie!'
                                                        : 'Nie całkiem...'}
                                                </h5>
                                                {currentQuestion.explanation && (
                                                    <p className="text-sm text-foreground/80">
                                                        {currentQuestion.explanation}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </>
                    )}
                </div>

                {/* Footer */}
                {!showSuccess && (
                    <div className="p-4 border-t bg-muted/30 flex justify-end">
                        {!isAnswered ? (
                            <Button
                                onClick={handleCheckAnswer}
                                disabled={selectedOption === null}
                                className="w-full sm:w-auto min-w-[120px]"
                            >
                                Sprawdź
                            </Button>
                        ) : isCorrect ? (
                            <Button
                                onClick={handleNext}
                                className="w-full sm:w-auto min-w-[120px] gap-2"
                            >
                                {isLastQuestion ? 'Zakończ' : 'Dalej'}
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        ) : (
                            <Button
                                onClick={handleRetry}
                                variant="outline"
                                className="w-full sm:w-auto min-w-[120px] gap-2"
                            >
                                <RotateCcw className="w-4 h-4" />
                                Spróbuj ponownie
                            </Button>
                        )}
                    </div>
                )}
            </motion.div>
        </div>
    );
}
