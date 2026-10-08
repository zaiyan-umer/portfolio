'use client'
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { motion, useAnimate } from 'motion/react'
import { FormEvent, useState } from 'react'
import { ArrowButton, showLoadingAnimation, showSuccessAnimation } from "./BtnAnimations"
import { CheckSVG, LoadingSVG } from "@/components/ui/svgs"

export function ContactForm({ className }: { className?: string }) {
    const [scope, animate] = useAnimate()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errors, setErrors] = useState({
        name: false,
        email: false,
        message: false
    })

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // Validate all fields
        const newErrors = {
            name: !formData.name.trim(),
            email: !formData.email.trim(),
            message: !formData.message.trim()
        }

        setErrors(newErrors)

        // If any errors, don't submit
        if (Object.values(newErrors).some(error => error)) {
            return
        }

        setIsSubmitting(true)

        // Show loading animation
        await showLoadingAnimation(animate)

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            const data = await response.json()

            if (response.ok) {
                // Show success animation
                await showSuccessAnimation(animate)
                // Reset form after successful submission
                setFormData({ name: '', email: '', message: '' })
            } else {
                // Hide loading and show error
                await animate(".loading-svg", {
                    opacity: 0,
                    display: "none"
                }, { duration: 0.2 })

                animate(".submit-text", {
                    width: "auto",
                    opacity: 1
                }, { duration: 0.3 })

                await animate(".arrow-right", {
                    opacity: 1,
                    display: "inline-block"
                }, { duration: 0.3 })

                alert(data.error || 'Failed to send message')
            }
        } catch (error) {
            console.error('Error submitting form:', error)

            // Hide loading and reset on error
            await animate(".loading-svg", {
                opacity: 0,
                display: "none"
            }, { duration: 0.2 })

            animate(".submit-text", {
                width: "auto",
                opacity: 1
            }, { duration: 0.3 })

            await animate(".arrow-right", {
                opacity: 1,
                display: "inline-block"
            }, { duration: 0.3 })

            alert('Failed to send message. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div id="contact" className={cn('', className)}>
            <h2 className="scroll-m-20 text-center text-4xl font-bold text-balance mb-8">Contact Me</h2>
            <form onSubmit={handleSubmit}>
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="fieldgroup-name">
                            Name<span className="text-red-500">*</span>
                        </FieldLabel>
                        <Input
                            id="fieldgroup-name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => {
                                setFormData({ ...formData, name: e.target.value })
                                if (errors.name && e.target.value.trim()) {
                                    setErrors({ ...errors, name: false })
                                }
                            }}
                            className={errors.name ? 'border-red-500 focus-visible:ring-red-500' : ''}
                        />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="fieldgroup-email">
                            Email<span className="text-red-500">*</span>
                        </FieldLabel>
                        <Input
                            id="fieldgroup-email"
                            type="email"
                            placeholder="name@example.com"
                            value={formData.email}
                            onChange={(e) => {
                                setFormData({ ...formData, email: e.target.value })
                                if (errors.email && e.target.value.trim()) {
                                    setErrors({ ...errors, email: false })
                                }
                            }}
                            className={errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}

                        />
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="fieldgroup-msg">
                            Message<span className="text-red-500">*</span>
                        </FieldLabel>
                        <Textarea
                            id="fieldgroup-msg"
                            placeholder="Type your message here."
                            value={formData.message}
                            onChange={(e) => {
                                setFormData({ ...formData, message: e.target.value })
                                if (errors.message && e.target.value.trim()) {
                                    setErrors({ ...errors, message: false })
                                }
                            }}
                            className={errors.message ? 'border-red-500 focus-visible:ring-red-500' : ''}
                        />
                    </Field>

                    <Field orientation="horizontal">
                        <Button
                            className="cursor-pointer text-(--submit-btn)"
                            type="reset"
                            variant="outline"
                            onClick={() => setFormData({ name: '', email: '', message: '' })}
                        >
                            Reset
                        </Button>
                        <motion.span whileHover="hover" ref={scope}>
                            <Button
                                className="cursor-pointer bg-(--gh-blue) hover:bg-(--gh-blue)/80 dark:text-(--submit-btn)"
                                type="submit"
                                disabled={isSubmitting}
                            >
                                <motion.span className="submit-text">Submit</motion.span>
                                <ArrowButton />
                                <CheckSVG className="check-svg hidden" />
                                <LoadingSVG className="loading-svg hidden" />
                            </Button>
                        </motion.span>
                    </Field>
                </FieldGroup>
            </form>
        </div>
    )
}

