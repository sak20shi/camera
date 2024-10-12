var PhotoCrop = function(imgObj, options) {
	this.imgObj = imgObj;
	this.settings = {
        size: {w: 100, h: 100},
		format: 'jpeg'
    };
    
    // Merge the contents of options objects together into the default settings.
    this.extend(this.settings, options);
    
    var prevCanvas = document.getElementById('croppedPhoto');
    if(prevCanvas){
		prevCanvas.parentNode.removeChild(prevCanvas);
    }
    
    this.init();
}
import android.content.Intent;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.provider.MediaStore;
import android.widget.ImageView;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    private static final int CAMERA_REQUEST = 1888;
    ImageView imageView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        imageView = findViewById(R.id.imageView);

        // Open camera
        Intent cameraIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        startActivityForResult(cameraIntent, CAMERA_REQUEST);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == CAMERA_REQUEST && resultCode == RESULT_OK) {
            Bitmap photo = (Bitmap) data.getExtras().get("data");
            imageView.setImageBitmap(photo);
        }
    }
}

PhotoCrop.prototype = {
    init: function() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'croppedPhoto';
        this.canvas.width = this.settings.size.w;
        this.canvas.height = this.settings.size.h;
        
        this.crop();
    },
    
    crop: function(){
    	// determine the size of the 1:1 square
    	var origWidth = (this.imgObj.naturalWidth) ? this.imgObj.naturalWidth : imgObj.width,
    		origHeight = (this.imgObj.naturalHeight) ? this.imgObj.naturalHeight : this.imgObj.height;
    	var sw, sh, sx, sy;
    		
    	sw = sh = Math.min(origWidth, origHeight);
    	sx = (sw == origWidth) ? 0 : ((origWidth - sw)/2) >>> 0;
    	sy = (sy == origWidth) ? 0 : ((origHeight - sh)/2) >>> 0;
    	
    	var dw = this.settings.size.w,
        	dh = this.settings.size.h,
        	dx = 0,
        	dy = 0;
        	//console.log(sx, sy, sw, sh, dx, dy, dw, dh);
        	
        var context = this.canvas.getContext('2d'); 
	    context.drawImage(this.imgObj, sx, sy, sw, sh, dx, dy, dw, dh);
    },
    
    extend: function(obj, extObj) {
        for (var prop in extObj) {
            obj[prop] = extObj[prop];
        } 
        return obj;
    },
    
    getDataURL: function() {
	    return this.canvas.toDataURL('image/'+this.settings.format, .8);
    },
    
    displayResult: function() {
	    this.imgObj.parentNode.appendChild(this.canvas);
    },
    
    removeResult: function() {
	    this.canvas.parentNode.removeChild(this.canvas);
	    console.log('canvas removed');
    }
}