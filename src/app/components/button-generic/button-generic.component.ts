import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-generic',
  standalone: true,
  imports: [],
  templateUrl: './button-generic.component.html',
  styleUrl: './button-generic.component.scss'
})
export class ButtonGenericComponent {
  @Input() label: string = 'ปุ่ม';
  @Input() classes: string = 'btn-save';
  @Input() disabled: boolean | null = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  @Output() clicked = new EventEmitter<void>();

  onClick() {
    if (!this.disabled) {
      this.clicked.emit();
    }
  }
}
