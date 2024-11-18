import { Component } from '@angular/core';
import { PrimerComponente } from '../../interfaces/primer-componente';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {

  blog1: PrimerComponente = {
    id: 1,
    titulo: "Jumbo-Visma",
    url: "https://r.testifier.nl/Acbs8526SDKI/resizing_type:fill/watermark:Kristoff%20Ramon%2F%20Red%20Bull%20Content%20Pool/plain/https://s3-newsifier.ams3.digitaloceanspaces.com/ciclismoaldia.newsifier.com/images/2022-11/si202207250129-63854ca48fb03.jpg@webp",
    texto: "Vingeggard y Wout Van Aert la lian en LE TOUR DE LE FRANCE",
    fecha: "15/11/2024 16:00"
  }
  blog2: PrimerComponente =   {
    id: 2,
    titulo: "Ineos Grenadiers",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUuFBgkuH-dWhQneNJidyPIr0sXF6LPpShmA&s",
    texto: "Carlos Rodriguez gana la etapa reina de LE TOUR DE LE FRANCE",
    fecha: "15/11/2024 16:10"
  }

  arrBlog: PrimerComponente [] = [this.blog1, this.blog2];


newBlog: PrimerComponente = {
  id: 0,
  titulo: "",
  url: '',
  texto: '',
  fecha: ''
};


publicarBlog() {
  this.arrBlog.push(this.newBlog);

  this.newBlog = {
    id: 0,
    titulo: "",
    url: "",
    texto: "",
    fecha: ""
  }
  console.log(this.arrBlog);
}


}
