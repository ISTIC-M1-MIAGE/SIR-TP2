import {icons} from 'lucide-react';

interface ComponentProps {
    name: keyof typeof icons,
    color?: string,
    size?: number,
    className?: string,
    inverseColor?: boolean;
    strokeWidth?: number;
}

export default function LucideIcon(props: ComponentProps) {
    const LucideIcon = icons[props.name];

    return <LucideIcon
        color={props.color}
        className={`flex-shrink-0 ${props.className}`}
        size={props.size}
        strokeWidth={props.strokeWidth}
    />;
};

