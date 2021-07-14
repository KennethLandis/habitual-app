export const userHabits = (habits, userId) => (
    // eslint-disable-next-line
    (!userId) ? habits : habits.filter(habit => habit.userId == userId))

export const findUser = (users, userId) => 
    // eslint-disable-next-line
    users.find(user => user.userId == userId)

export const findUserByName = (users, user_name) =>
    // eslint-disable-next-line
    users.find(user => user.user_name == user_name)