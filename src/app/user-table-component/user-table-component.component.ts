import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/UserService';
import { User } from '../models/user';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table-component.component.html',
  styleUrls: ['./user-table-component.component.scss']
})
export class UserTableComponent implements OnInit {
  users: User[] = [];
  editedUser: User = {} as User;
  isEditing: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getUsersUsernameAleasAndRole().subscribe(
      (users: User[]) => {
        this.users = users;
      },
      (error) => {
        console.error('Error fetching users: ', error);
      }
    );
  }

  editUser(user: User): void {
    if (user) {
      this.editedUser = { ...user };
      this.isEditing = true;
    }
  }

  cancelEdit(): void {
    this.isEditing = false;
  }

  updateUser(): void {
    const updatedFields = this.getUpdatedFields(this.users.find(u => u.id === this.editedUser.id));
    if (Object.keys(updatedFields).length === 0) {
      console.error('No fields updated');
      return;
    }

    this.userService.updateUser(this.editedUser.id, updatedFields).subscribe(
      () => {
        console.log('User updated successfully');
        this.isEditing = false;
        this.fetchUsers();
      },
      (error) => {
        console.error('Error updating user: ', error);
      }
    );
  }

  private getUpdatedFields(originalUser: User | undefined): Partial<User> {
    if (!originalUser) {
      return {};
    }

    const updatedFields: Partial<User> = {};
    if (originalUser.role !== this.editedUser.role) {
      updatedFields.role = this.editedUser.role;
    }
    if (originalUser.aleas !== this.editedUser.aleas) {
      updatedFields.aleas = this.editedUser.aleas;
    }
    if (originalUser.username !== this.editedUser.username) {
      updatedFields.username = this.editedUser.username;
    }
    if (originalUser.email !== this.editedUser.email) {
      updatedFields.email = this.editedUser.email;
    }
    // Add similar checks for other fields

    return updatedFields;
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(
      () => {
        console.log('User deleted successfully');
        this.fetchUsers();
      },
      (error) => {
        console.error('Error deleting user: ', error);
      }
    );
  }
}
