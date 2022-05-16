import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors, FormControl } from '@angular/forms';
import { User } from 'src/app/interfaces/User';
import { UsersService } from 'src/app/services/users/users.service';
import Swal from 'sweetalert2';


export const fnpasswordsIguales: ValidatorFn = (control: AbstractControl):
  ValidationErrors | null => {

  const pass1Control = control.get('password');
  const pass2Control = control.get('password2');

  if ((pass1Control != null || pass2Control) && pass1Control.value !== pass2Control.value) {
    pass2Control.setErrors({
      contrasenasIguales: false,
      msg: 'Contraseñas no son iguales'
    })
  }

  return ((pass1Control != null || pass2Control) && pass1Control.value !== pass2Control.value) ? {
    contrasenasIguales: 'no es correcto',
    msg: 'Revisar validacion de contraseñas'

  } : null;
}
@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;



  // dataUsers;
  // displayedColumns;

  displayedColumns: string[] = ['name', 'email', 'role', 'options'];
  dataSource;

  // registerForm: FormGroup;

  dataUsers;
  // dataSource;
  // displayedColumns;
  user;

  hide = true;

  public formSubmitted = false;

  public registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required,]),
      password2: new FormControl('', [Validators.required]),
    }, {
    validators: fnpasswordsIguales
  });





  constructor(
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.getUsers()
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  getUsers() {
    this.usersService.getUsers().subscribe((res) => {
      this.dataUsers = res;

      this.dataSource = new MatTableDataSource(this.dataUsers.users);
      this.dataSource.paginator = this.paginator;

      console.log("res", res)

      this.user = res

      console.log('res', this.user.uid)

      // this.displayedColumns = this.columns.map(c => c.columnDef)
    })
  }

  createUser() {
    this.formSubmitted = true;
    console.log(this.registerForm.value)

    if (this.registerForm.invalid) {
      console.log("form no is correct")
    } else {
      this.usersService.createUser(this.registerForm.value).subscribe({
        next: (res) => {
          console.log('user created', res)
          Swal.fire('Usuario Creado', 'Correctamente!', 'success')
          this.getUsers()
        },

        error: (err) => {
          console.warn(err.error.msg)
        }
      });
    }
  }


  deleteUser(idUser) {

    // console.log(idUser, this.usersService.uid);

    if (idUser === this.user.uid) {
      Swal.fire('Error', 'No se puede borrar así mismo', 'error')
    } else {
      this.usersService.deleteUser(idUser).subscribe({
        next: (res) => {
          console.log(res)
          Swal.fire('Usuario Eliminado', 'Correctamente!', 'success')

          this.getUsers();
        },
        error: (err) => {
          console.log(err)
        }
      })
    }
  }


  fielNoValid(campo: string): boolean {


    if (this.registerForm.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }

  }

  passwordNoValid() {
    const pass1 = this.registerForm.get('password').value
    const pass2 = this.registerForm.get('password2').value

    if ((pass1 !== pass2) && this.formSubmitted) {
      return true
    } else {
      return false
    }
  }



  roleChange(user: User) {
    // console.log("user", user)

    this.usersService.updateUser(user).subscribe({
      next: (res) => {
        console.log(res)
      },
      error: (e) => {
        console.log(e);

      }
    })
  }

}
