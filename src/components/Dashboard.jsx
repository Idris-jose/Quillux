import { BarChart, Star, TrendingUp, CheckCircle } from "lucide-react";

export default function Dashboard() {
    const actions = [
        {
            subtitle: "Ai usage",
            Title: "Content Generated",
            Subtext: "1,245 items this month",
            ButtonText: "View Details",
            Icon: BarChart,
        },
        {
            subtitle: "Quality",
            Title: "Avg. Score",
            Subtext: "1,245 items this month",
            ButtonText: "See feedback",
            Icon: Star,
        },
        {
            subtitle: "Growth",
            Title: "Engagement",
            Subtext: "1,245 items this month",
            ButtonText: "View Analytics",
            Icon: TrendingUp,
        },
        {
            subtitle: "Status",
            Title: "ALL Systems Go",
            Subtext: "1,245 items this month",
            ButtonText: "System Health",
            Icon: CheckCircle,
        },
    ];
    return (
        <>
            <h1 className="text-3xl font-bold mb-4">Overview</h1>
            <p className="text-gray-700"></p>
            <div className="mt-8">
                <div className="flex flex-col gap-4 p-4 rounded-lg mb-4 sm:flex-row sm:flex-wrap">
                    {actions.map((action) => {
                        const Icon = action.Icon;
                        return (
                            <div
                                className="flex flex-col gap-2 bg-gray-100 p-4 rounded shadow-md flex-1 min-w-[220px]"
                                key={action.Title}
                            >
                                <div className="flex items-center gap-2">
                                    <Icon className="text-orange-600" size={24} />
                                    <p className="text-orange-600">{action.subtitle}</p>
                                </div>
                                <h1 className="text-black font-medium">{action.Title}</h1>
                                <p className="text-gray-300">{action.Subtext}</p>
                                <button className="px-2 py-3 bg-orange-600 rounded font-medium text-white">
                                    {action.ButtonText}
                                </button>
                            </div>
                        );
                    })}
                </div>
                <h1 className="text-2xl font-bold mb-4">Recent Content</h1>
                <div className="bg-white p-4 rounded shadow-md">
                    <p className="text-gray-700 mb-2">No recent content available.</p>
                    <p className="text-gray-500">Content will appear here as you generate it.</p>
                </div>
            </div>
        </>
    );
}