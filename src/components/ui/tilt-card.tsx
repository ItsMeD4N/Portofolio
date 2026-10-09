"use client";

import React, { useRef } from "react";
import {
    motion,
    useMotionTemplate,
    useMotionValue,
    useSpring,
    useTransform,
} from "motion/react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Created once at module level; motion.create() inside render remounts the subtree every render.
const MotionLink = motion.create(Link);

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    href?: string;
    target?: string;
    rotationFactor?: number;
}

export function TiltCard({
    children,
    className,
    href,
    target,
    rotationFactor = 15,
    ...props
}: TiltCardProps) {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseY = useSpring(y, { stiffness: 300, damping: 30 });

    const rotateX = useTransform(
        mouseY,
        [-0.5, 0.5],
        [rotationFactor, -rotationFactor]
    );
    const rotateY = useTransform(
        mouseX,
        [-0.5, 0.5],
        [-rotationFactor, rotationFactor]
    );

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseXFromCenter = e.clientX - rect.left - width / 2;
        const mouseYFromCenter = e.clientY - rect.top - height / 2;

        const xPct = mouseXFromCenter / width;
        const yPct = mouseYFromCenter / height;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const transform = useMotionTemplate`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const MotionComponent: any = href ? MotionLink : motion.div;

    return (
        <MotionComponent
            ref={ref}
            href={href}
            target={target}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transformStyle: "preserve-3d",
                transform,
            }}
            className={cn("will-change-transform", className)}
            {...props}
        >
            {children}
        </MotionComponent>
    );
}
