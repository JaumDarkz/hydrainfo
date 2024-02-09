
import { cn } from "@/lib/utils";
import { LayoutDashboardIcon, MessageSquare } from "lucide-react";

interface HeadingProps {
  title: string;
  description: string;
  iconColor?: string;
  bgColor?: string;
}

export const Heading = ({
  title,
  description,
  iconColor,
  bgColor,
}: HeadingProps) => {
  return (
    <>
      <div className="px-4 lg:px-8 flex items-center gap-x-3 mb-8">
        <div className={cn("p-2 w-fit rounded-md", bgColor)}>
          <MessageSquare className={cn("w-10 h-10", iconColor)} />
        </div>
        <div>
          <h2 className="text-3xl font-bold">{title}</h2>
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </>
  );
};