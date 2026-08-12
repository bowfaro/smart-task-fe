import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Circle, CircleDashed, Clock, CalendarDays, MoreHorizontal, Timer, Flag } from "lucide-react"
import { cn } from "@/lib/utils/cn"
import { getStatsApi, getUpcomingTasksApi } from "@/lib/apis/dashboard.api"
import { formatDateTime, formatTimeOnly } from "@/lib/utils/functions";

export default async function OverviewPage() {
  const [statsData, upcomingTasksResponse] = await Promise.all([
    getStatsApi(),
    getUpcomingTasksApi()
  ]);

  const upcomingTasks = Array.isArray(upcomingTasksResponse) 
    ? upcomingTasksResponse 
    : (upcomingTasksResponse as any)?.data || (upcomingTasksResponse as any)?.items || (upcomingTasksResponse as any)?.tasks || [];

  const stats = {
    completionRate: statsData.completionRate,
    statusCounts: {
      todo: statsData.counters.todo,
      inProgress: statsData.counters.inProgress,
      done: statsData.counters.done
    }
  };
  const weeklyTasks = statsData.weeklyActivity;

  const todayTasks = upcomingTasks.filter(task => {
    const taskDate = new Date(task.startAt);
    const today = new Date();
    return taskDate.toDateString() === today.toDateString();
  });
  return (
    <div className="flex flex-col xl:flex-row gap-6 min-h-full w-full max-w-[1600px] mx-auto overflow-x-hidden">
      <div className="flex-1 flex flex-col gap-8 min-w-0">
        
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Dashboard</h2>
          <div className="flex flex-col gap-4">
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <Card className="bg-primary text-primary-foreground border-transparent">
                <CardHeader className="pb-2">
                  <CardDescription className="text-primary-foreground/80 font-medium">Task Completion</CardDescription>
                  <CardTitle className="text-4xl">{stats.completionRate}%</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="w-full bg-primary-foreground/20 rounded-full h-2 mt-4">
                    <div 
                      className="bg-primary-foreground h-2 rounded-full transition-all duration-500 ease-in-out" 
                      style={{ width: `${stats.completionRate}%` }} 
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2 flex flex-col justify-between">
                <CardHeader className="pb-0 pt-4">
                  <CardTitle className="text-lg">Weekly Activity</CardTitle>
                  <CardDescription>Tasks created and completed over the last 7 days</CardDescription>
                </CardHeader>
                <CardContent className="h-[120px] sm:h-[100px] flex items-end justify-between gap-1 sm:gap-2 pt-2 mt-auto">
                  {weeklyTasks.map((item) => {
                    const maxCount = Math.max(...weeklyTasks.map(t => t.count), 1);
                    const heightPercent = (item.count / maxCount) * 100;
                    return (
                      <div key={item.day} className="flex flex-col items-center gap-1.5 flex-1 h-full group">
                        <div className="w-full max-w-[40px] relative flex justify-center h-full items-end">
                          <div 
                            className="w-full bg-primary/20 rounded-t-sm transition-all duration-300 relative group-hover:bg-primary/30"
                            style={{ height: '100%' }}
                          >
                            <div 
                              className="absolute bottom-0 w-full bg-primary rounded-t-sm transition-all duration-500 group-hover:bg-primary/90"
                              style={{ height: `${heightPercent}%` }}
                            >
                              <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-foreground text-background text-[10px] py-0.5 px-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-sm whitespace-nowrap font-medium z-10 hidden sm:block">
                                {item.count} tasks
                              </div>
                            </div>
                          </div>
                        </div>
                        <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">{item.day}</span>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <div>
                    <CardDescription className="font-medium">To Do</CardDescription>
                    <CardTitle className="text-3xl">{stats.statusCounts.todo}</CardTitle>
                  </div>
                  <div className="h-10 w-10 bg-muted/50 rounded-full flex items-center justify-center shrink-0">
                    <Circle className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <div>
                    <CardDescription className="font-medium">In Progress</CardDescription>
                    <CardTitle className="text-3xl">{stats.statusCounts.inProgress}</CardTitle>
                  </div>
                  <div className="h-10 w-10 bg-blue-500/10 rounded-full flex items-center justify-center shrink-0">
                    <CircleDashed className="h-5 w-5 text-blue-500" />
                  </div>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <div>
                    <CardDescription className="font-medium">Done</CardDescription>
                    <CardTitle className="text-3xl">{stats.statusCounts.done}</CardTitle>
                  </div>
                  <div className="h-10 w-10 bg-green-500/10 rounded-full flex items-center justify-center shrink-0">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        <section className="mt-4 xl:mt-auto pb-2 flex flex-col min-h-0">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold tracking-tight">Upcoming Tasks</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {upcomingTasks.map((task) => (
              <Card key={task.id} className="min-w-0 hover:shadow-md transition-shadow flex flex-col">
                <CardHeader className="p-5 pb-3">
                  <div className="flex justify-between items-start gap-4">
                    <CardTitle className="text-base line-clamp-2 leading-tight" title={task.title}>{task.title}</CardTitle>
                    <button className="text-muted-foreground hover:text-foreground shrink-0 transition-colors">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </div>
                </CardHeader>
                <CardContent className="px-5 pb-5 pt-0 flex-1 flex flex-col justify-end">
                  <div className="flex flex-col gap-3 mt-1">
                    
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium capitalize",
                        task.status === 'completed' ? "bg-green-500/10 text-green-600" :
                        task.status === 'in_progress' ? "bg-blue-500/10 text-blue-600" :
                        "bg-muted text-muted-foreground"
                      )}>
                        {task.status === 'completed' ? <CheckCircle2 className="h-3 w-3" /> :
                        task.status === 'in_progress' ? <CircleDashed className="h-3 w-3" /> :
                        <Circle className="h-3 w-3" />}
                        {task.status.replace('_', ' ')}
                      </div>
                      <div className={cn(
                        "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium",
                        task.priority === 3 ? "bg-red-500/10 text-red-600" :
                        task.priority === 2 ? "bg-orange-500/10 text-orange-600" :
                        "bg-muted text-muted-foreground"
                      )}>
                        <Flag className="h-3 w-3" />
                        P{task.priority}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground border-t pt-3">
                      <div className="flex items-center gap-1.5" title="Start Time">
                        <CalendarDays className="h-3.5 w-3.5 shrink-0" />
                        <span className="truncate">{formatDateTime(task.startAt)}</span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0 font-medium" title="Estimated Hours">
                        <Timer className="h-3.5 w-3.5" />
                        {task.estimatedHours}h
                      </div>
                    </div>
                    
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>

      <aside className="w-full xl:w-80 2xl:w-96 flex shrink-0 flex-col min-w-0 mt-4">
        <Card className="h-auto xl:h-[calc(100vh-8rem)] max-h-[500px] xl:max-h-none flex flex-col bg-muted/40 border-dashed sticky top-12 overflow-hidden">
          <CardHeader className="pb-4 shrink-0">
            <CardTitle className="text-xl">Today&apos;s Tasks</CardTitle>
            <CardDescription>
              You have {todayTasks.filter(t => t.status !== 'completed').length} tasks left today.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto pr-4 mr-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-thumb]:rounded-full">
            <div className="space-y-4">
              {todayTasks.map((task) => (
                <div key={task.id} className="flex items-start gap-3 group relative p-2 -mx-2 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="mt-0.5 shrink-0 z-10 bg-background/50 rounded-full">
                    {task.status === "completed" ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : task.status === "in_progress" ? (
                      <CircleDashed className="h-5 w-5 text-blue-500" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-col gap-1 w-full min-w-0">
                    <p className={`text-sm font-medium leading-tight truncate ${task.status === "completed" ? "line-through text-muted-foreground opacity-70" : ""}`}>
                      {task.title}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3 w-3 shrink-0" />
                        <span className="truncate">{formatTimeOnly(task.startAt)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1 text-[10px] bg-background border px-1.5 py-0.5 rounded shadow-sm">
                          <Timer className="h-2.5 w-2.5" />
                          {task.estimatedHours}h
                        </span>
                        {task.priority === 3 && <Flag className="h-3 w-3 text-red-500 shrink-0" />}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </aside>
    </div>
  )
}
