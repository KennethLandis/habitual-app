export const clientHabits = (habits, client_id) => (
    // eslint-disable-next-line
    (!client_id) ? habits : habits.filter(habit => habit.client_id == client_id))

export const findClient = (clients, client_id) => 
    // eslint-disable-next-line
    clients.find(client => client.id == client_id)

export const findClientByName = (clients, client_name) =>
    // eslint-disable-next-line
    clients.find(client => client.client_name == client_name)

export const findHabit = (habits, habit_id) =>
    // eslint-disable-next-line
    habits.find(habit => habit.id == habit_id)