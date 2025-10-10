export interface SpeedData {
    time: string;
    download: number;
    upload: number;
}

let currentDownload = 20 + Math.random() * 10;
let currentUpload = 5 + Math.random() * 3;

export const generateInitialTrend = (): SpeedData[] => {
    const trend: SpeedData[] = [];
    const now = new Date();

    for (let i = 11; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 60 * 60 * 1000);
        trend.push({
            time: time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            download: 20 + Math.random() * 10,
            upload: 5 + Math.random() * 3,
        });
    }
    return trend;
};

export const getRealtimeSpeed = (): { download: number; upload: number } => {
    currentDownload += (Math.random() - 0.5) * 2;
    currentUpload += (Math.random() - 0.5) * 0.5;

    currentDownload = Math.max(5, Math.min(currentDownload, 50));
    currentUpload = Math.max(1, Math.min(currentUpload, 15));

    return {
        download: parseFloat(currentDownload.toFixed(1)),
        upload: parseFloat(currentUpload.toFixed(1)),
    };
};

export const calculateAverage = (data: SpeedData[]) => {
    const totalDownload = data.reduce((a, b) => a + b.download, 0);
    const totalUpload = data.reduce((a, b) => a + b.upload, 0);
    const avgDownload = totalDownload / data.length;
    const avgUpload = totalUpload / data.length;

    return {
        avgDownload: parseFloat(avgDownload.toFixed(1)),
        avgUpload: parseFloat(avgUpload.toFixed(1)),
    };
};