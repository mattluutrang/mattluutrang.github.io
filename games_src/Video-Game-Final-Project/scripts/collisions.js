/**
 * Helper function that checks for 2-D bounding box collisions
 */
function checkCollision(box1, box2) {
    return (box1.boundX < box2.boundX + box2.boundW && 
            box1.boundX + box1.boundW > box2.boundX &&
            box1.boundY < box2.boundY + box2.boundH && 
            box1.boundY + box1.boundH > box2.boundY);
}