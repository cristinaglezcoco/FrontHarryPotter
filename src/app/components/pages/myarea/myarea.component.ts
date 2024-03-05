import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-myarea',
  templateUrl: './myarea.component.html',
  styleUrls: ['./myarea.component.scss']
})
export class MyareaComponent implements OnInit {
  status: 'error' | 'success' | 'disabled' = 'disabled'
  message: string = ''
  //datos del wizard
  nameInput: string = '';
  lastNameInput: string = '';
  rolInput: string = '';
  houseInput: string = '';
  bloodInput: string = '';
  patronusInput: string = '';
  agrupacionInput: string = '';
  pictureInput: File | null = null;
  isFormValid: boolean = false;

  //datos usuario
  userName: string = '';
  userGenre: string = '';
  userWizard: string = '';
  userID: string = '';
  
  arrayWizardsId: string[] = []
  arrayWizardsInfo: { wizardData: any }[] = []
  

  constructor(
    private userService: UsersService,
    private requestService: RequestService
  ) {
    this.userName = sessionStorage.getItem('userName') || '';
    this.userGenre = sessionStorage.getItem('userGenre') || '';
    this.userWizard = sessionStorage.getItem('userWizard') || '';
  }

  onFileSelected(event: any) {
    this.pictureInput = event.target.files[0];
  }

  sendForm() {
    const formData = new FormData();
    formData.append('nombre', this.nameInput);
    formData.append('apellido', this.lastNameInput);
    formData.append('rol', this.rolInput);
    formData.append('casaNombre', this.houseInput);
    formData.append('sangreTipo', this.bloodInput);
    formData.append('patronus', this.patronusInput);
    formData.append('agrupacion', this.agrupacionInput);
    if (this.pictureInput) {
      formData.append('picture', this.pictureInput, this.pictureInput.name);
    }
  
    const id = sessionStorage.getItem('id');
    if (id !== null) {
      this.userID = id;
    } else {
      console.log('No estás logueado');
      return; // Salir de la función si no hay ID de usuario
    }

    if(
      this.nameInput.length <= 3 || 
      this.lastNameInput.length <= 3 || 
      ( this.houseInput !== 'Gryffindor' &&
        this.houseInput !== 'Hufflepuff' &&
        this.houseInput !== 'Slytherin' &&
        this.houseInput !== 'Ravenclaw')
      ) {
        console.log(this.nameInput + this.lastNameInput + this.houseInput);
        this.status = 'error';
        this.message = 'Nombre, apellido y casa es requerido'
    } else {
      this.userService.postWizard(formData).subscribe(
        (response) => {
          this.userService.updateUserWizard(this.userID, response._id).subscribe(
            (updateResponse) => {
              console.log(updateResponse);
              // Recargar los magos del usuario después de actualizar
              this.reloadUserWizards();
              // Agregar el nuevo mago al arreglo
              const newWizardData = {
                wizardName: this.nameInput,
                wizardLastName: this.lastNameInput,
                wizardPicture: response.picture, // Asegúrate de obtener la URL correcta de la imagen del servidor
                wizardPatronus: this.patronusInput,
                wizardHouse: this.houseInput,
                wizardBlood: this.bloodInput,
                wizardRol: this.rolInput,
                wizardGroup: this.agrupacionInput,
                _id: response._id
              };
              this.arrayWizardsInfo.push({ wizardData: newWizardData });
              // setTimeout(() => {
              //   this.router.navigate(['/characters']);
              // }, 1000);
              const userWizardArray = JSON.parse(this.userWizard || '[]');
              userWizardArray.push(response._id);
              this.userWizard = JSON.stringify(userWizardArray);
              sessionStorage.setItem('userWizard', this.userWizard)
              this.status = 'success';
              this.message = 'Éxito al registrar tu mago'
            },
            (error) => {
              console.error(error);
            }
          );
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
  

  reloadUserWizards() {
    this.requestService.reloadUserWizards().then(() => {
      console.log('Magos de usuario recargados correctamente');
    }).catch(error => {
      console.error('Error al recargar los magos de usuario:', error);
    });
  }

  ngOnInit() {
    this.userID = sessionStorage.getItem('id') ?? '';
    const userWizard = sessionStorage.getItem('userWizard');
    if (userWizard) {
      const userWizardsArray = JSON.parse(userWizard);
      this.arrayWizardsId = userWizardsArray;
      console.log('Contenido de this.arrayWizards:', this.arrayWizardsId);
      this.arrayWizardsId.forEach((wizardID) => {
        this.requestService.getUserWizardById(wizardID).then(
          (response: any) => {
            const wizardData = {
              wizardName: response.nombre,
              wizardLastName: response.apellido,
              wizardPicture: response.picture,
              wizardPatronus: response.patronus,
              wizardHouse: response.casaNombre,
              wizardBlood: response.sangreTipo,
              wizardRol: response.rol,
              wizardGroup: response.agrupacion,
              _id: response._id
            };
            this.arrayWizardsInfo.push({ wizardData }); // Aquí se agrega correctamente al array
          }
        );
      });
      console.log(this.arrayWizardsInfo)
    } else {
      console.log('No se encontró ningún valor para userWizard en sessionStorage.');
    }
  }  

  removeWizard(id: any) {
    this.userService.deleteWizard(id).subscribe(
        () => {
            console.log('Elemento borrado: ' + id);
            const userWizardArray = JSON.parse(this.userWizard || '[]');
            const index = userWizardArray.findIndex((wizard: any) => wizard === id); // Encontrar el índice del elemento con el id dado
            if (index !== -1) { // Verificar si se encontró el elemento
                console.log(index)
                userWizardArray.splice(index, 1); // Eliminar el elemento en el índice encontrado
                this.userWizard = JSON.stringify(userWizardArray);
                sessionStorage.setItem('userWizard', this.userWizard);                
            } else {
                console.log('No se encontró ningún elemento con el ID proporcionado.');
            }
            // Eliminar el mago del arreglo arrayWizardsInfo en la interfaz de usuario
            const wizardIndex = this.arrayWizardsInfo.findIndex(wizard => wizard.wizardData._id === id);
            if (wizardIndex !== -1) {
                this.arrayWizardsInfo.splice(wizardIndex, 1);
            }
            this.reloadUserWizards();
        },
        (error) => {
            console.error('Error al eliminar el mago:', error);
        }
    );
  }


  deleteWizardIdToUser(userId: string, wizardId: any) {
    this.userService.deleteUserWizard(wizardId, userId).subscribe();
    this.reloadUserWizards();
    const userWizardArray = JSON.parse(this.userWizard || '[]');
    const index = userWizardArray.indexOf(wizardId);
    userWizardArray.splice(index, 1)
    this.userWizard = JSON.stringify(userWizardArray);
    sessionStorage.setItem('userWizard', this.userWizard);
  }
}
