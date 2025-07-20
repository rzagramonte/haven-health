import 'server-only'

import { cache } from 'react'

export async function createUser() {}

export const getCurrentUser = cache(async () => {})

export const getUserByEmail = cache(async () => {})

export const getUsers = cache(async () => {})

export async function deleteUser() {}

export async function updateUser() {}
