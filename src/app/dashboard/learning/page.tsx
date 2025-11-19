import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { mockLearningModules } from "@/lib/data";
import { BookOpen, Clock, Languages } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


export default function LearningPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <BookOpen className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">Learning Hub</h1>
        </div>
        <div className="flex items-center gap-2">
            <Languages className="h-5 w-5 text-muted-foreground" />
            <Select>
                <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by language" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Languages</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="hi">Hindi</SelectItem>
                    <SelectItem value="ta">Tamil</SelectItem>
                    <SelectItem value="te">Telugu</SelectItem>
                    <SelectItem value="bn">Bengali</SelectItem>
                    <SelectItem value="mr">Marathi</SelectItem>
                </SelectContent>
            </Select>
        </div>
      </div>
      <p className="text-muted-foreground max-w-2xl">
        Empower yourself with new skills. Explore our curated courses and articles designed for your growth.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {mockLearningModules.map((module) => (
          <Card key={module.id} className="flex flex-col overflow-hidden transition-all hover:shadow-lg">
            <CardHeader className="p-0">
              <div className="relative aspect-video">
                <Image
                  src={module.imageUrl}
                  alt={module.title}
                  fill
                  className="object-cover"
                  data-ai-hint={
                    module.title.toLowerCase().includes('cook') ? 'food preparation' :
                    module.title.toLowerCase().includes('plate') ? 'gourmet food' :
                    module.title.toLowerCase().includes('marketing') ? 'digital marketing' :
                    module.title.toLowerCase().includes('coding') ? 'laptop code' :
                    'woman working'
                  }
                />
              </div>
            </CardHeader>
            <CardContent className="p-4 flex-grow space-y-3">
               <Badge variant={module.type === 'video' ? 'default' : 'secondary'} className="capitalize bg-accent text-accent-foreground">{module.type}</Badge>
              <CardTitle className="text-lg leading-snug">{module.title}</CardTitle>
              <CardDescription className="line-clamp-2">{module.description}</CardDescription>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex-col items-start gap-3">
              <div className="flex items-center text-sm text-muted-foreground w-full">
                <Clock className="mr-1.5 h-4 w-4" />
                <span>{module.duration}</span>
              </div>
              <div>
                <Progress value={module.progress} className="h-2 w-full" />
                <span className="text-xs text-muted-foreground mt-1">
                  {module.progress}% Complete
                </span>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
