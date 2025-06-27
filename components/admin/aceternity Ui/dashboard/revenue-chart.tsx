"use client";

/* import axios from "axios";
import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; */

// const chartConfig = {
//   merchants: {
//     label: "Merchants",
//     color: "hsl(var(--chart-1))",
//   },
//   users: {
//     label: "Users",
//     color: "hsl(var(--chart-2))",
//   },
// } satisfies ChartConfig;

// export function RevenueChart() {
//   const start = new Date();
//   start.setDate(start.getDate() - 90);
//   const [timeRange, setTimeRange] = React.useState("90d");
//   const [data, setData] = React.useState([]);
//   const [startDate, setStartDate] = React.useState(start);

//   const handleTimeRangeChange = (value: string) => {
//     setTimeRange(value);
//     let daysToSubtract = 90;
//     if (value === "30d") {
//       daysToSubtract = 30;
//     } else if (value === "7d") {
//       daysToSubtract = 7;
//     }
//     const newStartDate = new Date();
//     newStartDate.setDate(newStartDate.getDate() - daysToSubtract);
//     setStartDate(newStartDate);
//   };

//   React.useEffect(() => {
//     const getData = async () => {
//       try {
//         const res = await axios.post("/api/admin/userTraffic", {
//           startDate: startDate.toISOString(),
//         });
//         setData(res.data.Data);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     getData();
//   }, [startDate]);

//   interface CurrProps {
//     createdAt: string;
//     role: string[];
//   }

//   const processedData = React.useMemo(() => {
//     return data.reduce((acc, curr: CurrProps) => {
//       const date = new Date(curr.createdAt).toLocaleDateString("en-US", {
//         month: "short",
//         day: "numeric",
//       });
//       const existingEntry = acc.find((item) => item.date === date);

//       if (existingEntry) {
//         existingEntry.merchants += curr.role.includes("MERCHANT") ? 1 : 0;
//         existingEntry.users += curr.role.includes("USER") ? 1 : 0;
//       } else {
//         acc.push({
//           date,
//           merchants: curr.role.includes("MERCHANT") ? 1 : 0,
//           users: curr.role.includes("USER") ? 1 : 0,
//         });
//       }

//       return acc;
//     }, [] as { date: string; merchants: number; users: number }[]);
//   }, [data]);

//   return (
//     <Card>
//       <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
//         <div className="grid flex-1 gap-1 text-center sm:text-left">
//           <CardTitle>Account Traffic</CardTitle>
//           <CardDescription>
//             Showing total accounts created for the last{" "}
//             {timeRange.split("d")[0]} days
//           </CardDescription>
//         </div>
//         <Select value={timeRange} onValueChange={handleTimeRangeChange}>
//           <SelectTrigger
//             className="w-[160px] rounded-lg sm:ml-auto"
//             aria-label="Select a value"
//           >
//             <SelectValue placeholder="Last 3 months" />
//           </SelectTrigger>
//           <SelectContent className="rounded-xl">
//             <SelectItem value="90d" className="rounded-lg">
//               Last 3 months
//             </SelectItem>
//             <SelectItem value="30d" className="rounded-lg">
//               Last 30 days
//             </SelectItem>
//             <SelectItem value="7d" className="rounded-lg">
//               Last 7 days
//             </SelectItem>
//           </SelectContent>
//         </Select>
//       </CardHeader>
//       <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
//         <ChartContainer
//           config={chartConfig}
//           className="aspect-auto h-[250px] w-full"
//         >
//           <AreaChart data={processedData}>
//             <defs>
//               <linearGradient id="fillMerchants" x1="0" y1="0" x2="0" y2="1">
//                 <stop
//                   offset="5%"
//                   stopColor="var(--color-merchants)"
//                   stopOpacity={0.8}
//                 />
//                 <stop
//                   offset="95%"
//                   stopColor="var(--color-merchants)"
//                   stopOpacity={0.1}
//                 />
//               </linearGradient>
//               <linearGradient id="fillUsers" x1="0" y1="0" x2="0" y2="1">
//                 <stop
//                   offset="5%"
//                   stopColor="var(--color-users)"
//                   stopOpacity={0.8}
//                 />
//                 <stop
//                   offset="95%"
//                   stopColor="var(--color-users)"
//                   stopOpacity={0.1}
//                 />
//               </linearGradient>
//             </defs>
//             <CartesianGrid vertical={false} />
//             <XAxis
//               dataKey="date"
//               tickLine={false}
//               axisLine={false}
//               tickMargin={8}
//               minTickGap={32}
//             />
//             <YAxis
//               tickLine={false}
//               axisLine={false}
//               tickMargin={8}
//               tickFormatter={(value) => `${value}`}
//             />
//             <ChartTooltip
//               cursor={false}
//               content={<ChartTooltipContent indicator="dot" />}
//             />
//             <Area
//               dataKey="merchants"
//               type="monotone"
//               fill="url(#fillMerchants)"
//               stroke="var(--color-merchants)"
//               stackId="1"
//             />
//             <Area
//               dataKey="users"
//               type="monotone"
//               fill="url(#fillUsers)"
//               stroke="var(--color-users)"
//               stackId="1"
//             />
//             {/* <ChartLegend content={<ChartLegendContent />} /> */}
//           </AreaChart>
//         </ChartContainer>
//       </CardContent>
//     </Card>
//   );
// }

export function RevenueChart() {
  return <div>Revenue Chart</div>;
}
