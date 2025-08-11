import { useState, useMemo, useEffect } from "react";
import CalendarMonth from "./components/CalendarMonth";
import FilterPanel from "./components/FilterPanel";
import { CalenderTask } from "./types/calender";
import { addWeeks, isWithinInterval, startOfDay, endOfDay } from "date-fns";
import moment from "moment";

const App = () => {
  const [currentDate, setCurrentDate] = useState(moment().toDate());
  const [tasks, setTasks] = useState<CalenderTask[]>([]);
  
  useEffect(() => {
    const saved = localStorage.getItem('calendar-tasks');
    if (saved) {
      const parsed = JSON.parse(saved).map((task: any) => ({
        ...task,
        start: new Date(task.start),
        end: new Date(task.end),
      }));
      setTasks(parsed);
    } else {
      setTasks([]);
    }
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('calendar-tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilters, setCategoryFilters] = useState<string[]>([]);
  const [timeFilter, setTimeFilter] = useState('');

  const filteredTasks = useMemo(() => {
    let filtered = tasks;

    if (searchTerm) {
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilters.length > 0) {
      filtered = filtered.filter(task => 
        categoryFilters.includes(task.category)
      );
    }

    if (timeFilter) {
      const now = new Date();
      const weeks = parseInt(timeFilter.replace('weeks', '').replace('week', ''));
      const endDate = addWeeks(now, weeks);
      
      filtered = filtered.filter(task => 
        isWithinInterval(task.start, { start: startOfDay(now), end: endOfDay(endDate) }) ||
        isWithinInterval(task.end, { start: startOfDay(now), end: endOfDay(endDate) })
      );
    }
    
    


    return filtered;
  }, [tasks, searchTerm, categoryFilters, timeFilter]);

  const handleResetFilters = () => {
      setSearchTerm("");
      setCategoryFilters([]);
      setTimeFilter("");
    };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <FilterPanel
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              categoryFilters={categoryFilters}
              onCategoryChange={setCategoryFilters}
              timeFilter={timeFilter}
              onTimeFilterChange={setTimeFilter}
              onResetFilters={handleResetFilters}
            />
          </div>
          <div className="lg:col-span-3">
            <div className="hidden sm:flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Task Planner</h2>
              <div className="text-sm text-gray-300">
                Month view - click & drag across days to create a task
              </div>
            </div>
            <CalendarMonth 
              currentDate={currentDate} 
              onDateChange={setCurrentDate}
              tasks={filteredTasks}
              onTasksChange={setTasks}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
