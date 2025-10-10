import { FaLightbulb, FaCheckCircle } from "react-icons/fa"

export const QuickTips = () => {
    return (
        <div className="bg-gradient-to-b from-white to-gray-50 p-5 rounded-2xl border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300 text-sm text-gray-700">
            <div className="flex items-center gap-2 mb-3">
                <FaLightbulb className="text-amber-400 text-lg" />
                <h3 className="font-semibold text-gray-800 text-base">Quick Tips</h3>
            </div>

            <ul className="space-y-2">
                <TipItem text="Freeze new borrowing to stop the compounding loop." />
                <TipItem text="Prioritize the highest interest (Avalanche) or smallest balance (Snowball)." />
                <TipItem text="Use projections to negotiate with lenders by showing a clear plan." />
            </ul>
        </div>
    )
}

const TipItem = ({ text }: { text: string }) => (
    <li className="flex items-start gap-2 group">
        <FaCheckCircle className="text-emerald-500 mt-[2px] flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
        <span className="leading-relaxed">{text}</span>
    </li>
)