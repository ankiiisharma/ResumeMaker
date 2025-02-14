import React from 'react'


const Loading = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-900">
            <div className="space-y-4 p-4 w-96 bg-slate-800 rounded-lg animate-pulse">
            <div className="h-6 bg-slate-700 rounded"></div>
            <div className="h-6 bg-slate-700 rounded"></div>
            <div className="h-6 bg-slate-700 rounded"></div>
            <div className="h-6 bg-slate-700 rounded"></div>
            <div className="h-6 bg-slate-700 rounded"></div>
            <div className="h-6 bg-slate-700 rounded"></div>
        </div>
        </div>
    )
}

export default Loading