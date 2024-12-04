function calculateDistance(x1: number, y1: number, x2: number, y2: number): number {
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}


function calculateAngle(x1: number, y1: number, x2: number, y2: number): number {
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;
    
    const angleRadians = Math.atan2(deltaY, deltaX);
    
    const angleDegrees = angleRadians * (180 / Math.PI) + 180;
    
    return angleDegrees;
}

export { calculateDistance, calculateAngle };