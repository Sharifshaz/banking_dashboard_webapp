import { 
  Plus, 
  Target, 
  MoreHorizontal,
  Pencil
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SAVINGS_GOALS } from "@/data/mockData";
import { cn } from "@/lib/utils";

export default function SavingsGoals() {
  const totalSaved = SAVINGS_GOALS.reduce((acc, g) => acc + g.saved, 0);
  const totalTarget = SAVINGS_GOALS.reduce((acc, g) => acc + g.target, 0);
  const overallProgress = (totalSaved / totalTarget) * 100;

  return (
    <div className="space-y-8">
      {/* KPI Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm font-medium text-muted-foreground">Total Saved</p>
            <h3 className="text-2xl font-bold mt-1">₹{totalSaved.toLocaleString()}</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm font-medium text-muted-foreground">Total Target</p>
            <h3 className="text-2xl font-bold mt-1">₹{totalTarget.toLocaleString()}</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Overall Progress</p>
              <h3 className="text-2xl font-bold mt-1">{overallProgress.toFixed(1)}%</h3>
            </div>
            <div className="h-12 w-12 rounded-full border-4 border-indigo-100 border-t-indigo-600 flex items-center justify-center">
              <Target className="h-5 w-5 text-indigo-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Your Goals</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" /> Add New Goal</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Savings Goal</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Goal Name</Label>
                <Input placeholder="e.g. New Car" />
              </div>
              <div className="space-y-2">
                <Label>Target Amount</Label>
                <Input type="number" placeholder="₹" />
              </div>
              <div className="space-y-2">
                <Label>Target Date</Label>
                <Input type="date" />
              </div>
              <Button className="w-full">Create Goal</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {SAVINGS_GOALS.map((goal) => {
          const progress = (goal.saved / goal.target) * 100;
          return (
            <Card key={goal.id} className="overflow-hidden group">
              <div className={cn("h-1.5 w-full", goal.color)} />
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{goal.emoji}</div>
                    <div>
                      <h3 className="font-bold text-lg">{goal.name}</h3>
                      <p className="text-sm text-muted-foreground">Target: {goal.deadline}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <Pencil className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm font-medium">
                    <span>₹{goal.saved.toLocaleString()}</span>
                    <span className="text-muted-foreground">of ₹{goal.target.toLocaleString()}</span>
                  </div>
                  <Progress value={progress} className="h-3" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{progress.toFixed(0)}% completed</span>
                    {progress >= 95 && <span className="text-emerald-600 font-bold">Almost there!</span>}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button className="flex-1" variant="outline">Add Money</Button>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
        
        {/* Add New Placeholder */}
        <div className="border-2 border-dashed border-muted-foreground/20 rounded-xl flex flex-col items-center justify-center p-6 text-muted-foreground hover:bg-muted/30 transition-colors cursor-pointer min-h-[200px]">
          <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
            <Plus className="h-6 w-6" />
          </div>
          <p className="font-medium">Create New Goal</p>
        </div>
      </div>
    </div>
  );
}
