import React, { useState } from 'react';
import { BarChart, Star, TrendingUp, CheckCircle, Calendar, FileText, Share2, Mail, Megaphone, Eye, MousePointer, Users, Clock } from "lucide-react";

export default function Analytics(){
    const [timeRange, setTimeRange] = useState("This Week");
    const timeRanges = ["Today", "This Week", "This Month", "Last 3 Months"];

    const metrics = [
        {
            subtitle: "Content Generated",
            Subtext: "1,245",
            text: "Total pieces created this week",
            Icon: BarChart,
            change: "+12%",
            positive: true
        },
        {
            subtitle: "Ad Copy",
            Subtext: "312",
            text: "Ad copy generated this week",
            Icon: Star,
            change: "+8%",
            positive: true
        },
        {
            subtitle: "Engagement Rate",
            Subtext: "4.8%",
            text: "Average engagement across platforms",
            Icon: TrendingUp,
            change: "+0.3%",
            positive: true
        },
        {
            subtitle: "Top Channel",
            Subtext: "Facebook",
            text: "Most active channel this week",
            Icon: CheckCircle,
            change: "67% of traffic",
            positive: true
        },
    ];

    const contentBreakdown = [
        { type: "Blog Posts", count: 45, icon: FileText, color: "bg-blue-100 text-blue-700" },
        { type: "Social Media", count: 128, icon: Share2, color: "bg-green-100 text-green-700" },
        { type: "Email Campaigns", count: 23, icon: Mail, color: "bg-purple-100 text-purple-700" },
        { type: "Ad Copy", count: 67, icon: Megaphone, color: "bg-orange-100 text-orange-700" },
    ];

    const recentContent = [
        {
            title: "Summer Sale Email Campaign",
            type: "Email",
            created: "2 hours ago",
            status: "Published",
            engagement: "12.4%",
            icon: Mail
        },
        {
            title: "Product Launch Social Post",
            type: "Social Media",
            created: "5 hours ago", 
            status: "Scheduled",
            engagement: "8.7%",
            icon: Share2
        },
        {
            title: "How-to Guide Blog Post",
            type: "Blog",
            created: "1 day ago",
            status: "Published",
            engagement: "15.2%",
            icon: FileText
        },
        {
            title: "Facebook Ad Copy - Holiday Sale",
            type: "Ad Copy",
            created: "2 days ago",
            status: "Active",
            engagement: "6.3%",
            icon: Megaphone
        }
    ];

    const performanceMetrics = [
        { label: "Total Views", value: "24.7K", icon: Eye },
        { label: "Click Rate", value: "3.2%", icon: MousePointer },
        { label: "Audience Reach", value: "18.9K", icon: Users },
        { label: "Avg. Read Time", value: "2m 34s", icon: Clock }
    ];

    return(
        <div className="p-6 bg-white min-h-screen">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h1 className="text-3xl font-bold mb-2 text-black">Analytics Dashboard</h1>
                    <p className="text-gray-600">Track your content performance and key metrics</p>
                </div>
                <select 
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                    {timeRanges.map(range => (
                        <option key={range} value={range}>{range}</option>
                    ))}
                </select>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {metrics.map((metric, idx) => {
                    const Icon = metric.Icon;
                    return (
                        <div
                            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                            key={idx}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <Icon className="text-orange-600" size={24} />
                                <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                                    metric.positive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                }`}>
                                    {metric.change}
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold text-black mb-1">{metric.Subtext}</h3>
                            <p className="text-orange-600 text-sm font-medium mb-1">{metric.subtitle}</p>
                            <p className="text-gray-500 text-sm">{metric.text}</p>
                        </div>
                    );
                })}
            </div>

            {/* Content Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2">
                    <h2 className="text-xl font-bold mb-4 text-black">Content Breakdown</h2>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <div className="grid grid-cols-2 gap-4">
                            {contentBreakdown.map((item, idx) => {
                                const Icon = item.icon;
                                return (
                                    <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                                        <div className={`p-2 rounded-lg ${item.color}`}>
                                            <Icon size={20} />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-black">{item.count}</p>
                                            <p className="text-sm text-gray-600">{item.type}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-bold mb-4 text-black">Performance</h2>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <div className="space-y-4">
                            {performanceMetrics.map((perf, idx) => {
                                const Icon = perf.icon;
                                return (
                                    <div key={idx} className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Icon className="text-gray-500" size={16} />
                                            <span className="text-sm text-gray-600">{perf.label}</span>
                                        </div>
                                        <span className="font-semibold text-black">{perf.value}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Content */}
            <div>
                <h2 className="text-xl font-bold mb-4 text-black">Recent Content</h2>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    {recentContent.length > 0 ? (
                        <div className="divide-y divide-gray-200">
                            {recentContent.map((content, idx) => {
                                const Icon = content.icon;
                                return (
                                    <div key={idx} className="p-4 hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-gray-100 rounded-lg">
                                                    <Icon className="text-gray-600" size={16} />
                                                </div>
                                                <div>
                                                    <h3 className="font-medium text-black">{content.title}</h3>
                                                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                                                        <span>{content.type}</span>
                                                        <span>•</span>
                                                        <span>{content.created}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-1 ${
                                                    content.status === 'Published' ? 'bg-green-100 text-green-700' :
                                                    content.status === 'Active' ? 'bg-blue-100 text-blue-700' :
                                                    'bg-orange-100 text-orange-700'
                                                }`}>
                                                    {content.status}
                                                </div>
                                                <p className="text-sm text-gray-600">{content.engagement} engagement</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="p-8 text-center">
                            <p className="text-gray-500 mb-2">No recent content available.</p>
                            <p className="text-gray-400 text-sm">Content will appear here as you generate it.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>   
    )
}