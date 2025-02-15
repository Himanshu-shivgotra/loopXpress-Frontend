import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_colorpicker/flutter_colorpicker.dart';
import 'package:image_picker/image_picker.dart';
import 'dart:io';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

import '../../../../utils/constants/colors.dart';
import '../../../../utils/http/http_client.dart';

class AddNewProduct extends StatefulWidget {
  final VoidCallback onProductAdded;

  AddNewProduct({required this.onProductAdded});

  @override
  _AddNewProductState createState() => _AddNewProductState();
}

class _AddNewProductState extends State<AddNewProduct> {
  final _formKey = GlobalKey<FormState>();
  final ImagePicker _picker = ImagePicker();
  String _sellerName = "Loading...";

  String _name = '';
  String _title = '';
  String _brand = '';
  List<XFile> _uploadedFiles = [];
  List<String> _imageUrls = [];
  String _originalPrice = '';
  String _discountedPrice = '';
  String _category = '';
  String _subcategory = '';
  String _quantity = '';
  String _size = '';
  String _description = '';
  String _material = '';
  String _weight = '';
  String _dimensions = '';
  String _manufacturingDate = '';
  String _warranty = '';
  String _shippingInfo = '';
  List<String> _highlights = [''];
  String _stockAlert = '';
  List<Map<String, String>> _colors = [];
  bool _isSubmitting = false;

  Color _currentColor = Colors.orange;
  bool _showColorPicker = false;

  List<Map<String, dynamic>> categories = [
    {
      "category": "electronics",
      "label": "Electronics",
      "subcategories": [
        {"value": "smartphones", "label": "Smartphones"},
        {"value": "laptops", "label": "Laptops"},
      ]
    },
    {
      "category": "clothing",
      "label": "Clothing",
      "subcategories": [
        {"value": "shirts", "label": "Shirts"},
        {"value": "pants", "label": "Pants"},
      ]
    }
  ];

  Map<String, List<String>> sizeOptionsMap = {
    "clothing": ["S", "M", "L", "XL"],
    "electronics": ["10inch", "12inch", "15inch"],
  };

  Map<String, String> subcategorySizeMap = {
    "shirts": "clothing",
    "pants": "clothing",
    "smartphones": "electronics",
    "laptops": "electronics",
  };

  void _handleChange(String name, String value) {
    setState(() {
      if (name == "category") {
        _category = value;
        _size = '';
        _subcategory = '';
      } else {
        switch (name) {
          case "title":
            _title = value;
            break;
          case "brand":
            _brand = value;
            break;
          case "originalPrice":
            _originalPrice = value;
            break;
          case "discountedPrice":
            _discountedPrice = value;
            break;
          case "quantity":
            _quantity = value;
            break;
          case "description":
            _description = value;
            break;
          case "material":
            _material = value;
            break;
          case "weight":
            _weight = value;
            break;
          case "dimensions":
            _dimensions = value;
            break;
          case "manufacturingDate":
            _manufacturingDate = value;
            break;
          case "warranty":
            _warranty = value;
            break;
          case "shippingInfo":
            _shippingInfo = value;
            break;
          case "stockAlert":
            _stockAlert = value;
            break;
        }
      }
    });
  }

  void _addHighlight() {
    setState(() {
      _highlights.add('');
    });
  }

  void _removeHighlight(int index) {
    setState(() {
      _highlights.removeAt(index);
    });
  }

  void _handleHighlightChange(int index, String value) {
    setState(() {
      _highlights[index] = value;
    });
  }

  void _addColor() {
    setState(() {
      // Convert the Color to a hex string
      String hexColor = '#${_currentColor.value.toRadixString(16).padLeft(8, '0').substring(2)}';

      // Use the hex code itself as the name
      _colors.add({"name": hexColor, "hex": hexColor});

      _showColorPicker = false; // Hide the color picker after adding
    });
  }


  void _removeColor(int index) {
    setState(() {
      _colors.removeAt(index);
    });
  }

  void _openColorPicker() {
    setState(() {
      _showColorPicker = true;
    });
  }

  void _closeColorPicker() {
    setState(() {
      _showColorPicker = false;
    });
  }

  @override
  void initState() {
    super.initState();
    _fetchSellerName();
  }

  Future<void> _fetchSellerName() async {
    final prefs = await SharedPreferences.getInstance();
    setState(() {
      _sellerName = prefs.getString('sellerName') ?? 'Seller Name';
    });
  }

  Future<void> _handleFileChange() async {
    final List<XFile>? images = await _picker.pickMultiImage();
    if (images != null) {
      setState(() {
        _uploadedFiles.addAll(images);
        _imageUrls.addAll(images.map((file) => file.path).toList());
      });
    }
  }

  void _removeUploadedImage(int index) {
    setState(() {
      _uploadedFiles.removeAt(index);
      _imageUrls.removeAt(index);
    });
  }

  Future<void> _submitForm() async {
    if (_formKey.currentState!.validate()) {
      setState(() {
        _isSubmitting = true;
      });

      try {
        String? authToken = await THttpHelper.getToken();
        if (authToken == null) throw Exception("No auth token found");

        // Upload images first
        List<String> cloudinaryUrls = [];
        for (var file in _uploadedFiles) {
          final bytes = await file.readAsBytes();
          final response = await Dio().post(
            'https://api.cloudinary.com/v1_1/dgcwh4rzw/image/upload',
            data: FormData.fromMap({
              'file': MultipartFile.fromBytes(bytes, filename: file.name),
              'upload_preset': 'loopxpress',
              'api_key': '178353987235797',
            }),
          );
          cloudinaryUrls.add(response.data['secure_url']);
        }

        // Create JSON data with cloudinary URLs
        final Map<String, dynamic> jsonData = {
          "title": _title.isNotEmpty ? _title : "N/A",
          "brand": _brand.isNotEmpty ? _brand : "N/A",
          "originalPrice": _originalPrice.isNotEmpty ? _originalPrice : "0",
          "discountedPrice": _discountedPrice.isNotEmpty ? _discountedPrice : "0",
          "category": _category.isNotEmpty ? _category : "N/A",
          "subcategory": _subcategory.isNotEmpty ? _subcategory : "N/A",
          "quantity": _quantity.isNotEmpty ? _quantity : "0",
          "size": _size.isNotEmpty ? _size : "nil",
          "description": _description.isNotEmpty ? _description : "N/A",
          "material": _material.isNotEmpty ? _material : "0",
          "weight": _weight.isNotEmpty ? _weight : "0",
          "manufacturingDate": _manufacturingDate.isNotEmpty ? _manufacturingDate : "0",
          "warranty": _warranty.isNotEmpty ? _warranty : "N/A",
          "shippingInfo": _shippingInfo.isNotEmpty ? _shippingInfo : "N/A",
          "stockAlert": _stockAlert.isNotEmpty ? _stockAlert : "0",
          "highlights": _highlights.isNotEmpty ? _highlights : [],
          "colors": _colors.isNotEmpty ? jsonEncode(_colors) : jsonEncode([]),
          "imageUrls": cloudinaryUrls,
        };

        final response = await Dio().post(
          'https://loopxpress-backend.onrender.com/api/products/add-product',
          data: jsonEncode(jsonData),
          options: Options(
            headers: {
              'Authorization': 'Bearer $authToken',
              'Content-Type': 'application/json',
            },
          ),
        );

        if (response.statusCode == 201) {
          if (response.data != null) {
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(content: Text('Product added successfully!')),
            );
            widget.onProductAdded();
          } else {
            throw Exception('Empty response data');
          }
        } else {
          throw Exception('Failed to add product: ${response.statusCode}');
        }
      } catch (error) {
        print('Error adding product: $error');
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error adding product: ${error.toString()}')),
        );
      } finally {
        setState(() {
          _isSubmitting = false;
        });
      }
    }
  }




  Widget _renderSizeField() {
    final sizeType = subcategorySizeMap[_subcategory] ?? 'none';
    if (sizeType == 'none') return Container();

    return DropdownButtonFormField<String>(
      value: (sizeOptionsMap[sizeType] != null && sizeOptionsMap[sizeType]!.contains(_size))
          ? _size
          : null, // Ensuring _size is valid
      onChanged: (value) {
        setState(() {
          _size = value!;
        });
      },
      items: [
        DropdownMenuItem<String>(
          value: null,
          child: Text('Select Size', style: TextStyle(color: Colors.grey)),
        ),
        if (sizeOptionsMap[sizeType] != null)
          ...sizeOptionsMap[sizeType]!.map<DropdownMenuItem<String>>((size) {
            return DropdownMenuItem<String>(
              value: size,
              child: Text(size),
            );
          }).toList(),
      ],
      decoration: InputDecoration(
        labelText: 'Size',
        border: OutlineInputBorder(),
      ),
    );
  }

  Widget _renderSubcategoryField() {
    final Map<String, dynamic> selectedCategory = categories.firstWhere(
          (category) => category['category'] == _category,
      orElse: () => {}, // Return an empty map instead of null
    );
    if (selectedCategory.isEmpty || selectedCategory['subcategories'] == null) {
      return Container(); // Prevent errors if subcategories don't exist
    }
    return DropdownButtonFormField<String>(
      value: (selectedCategory['subcategories'] as List<dynamic>?)
          ?.any((subcategory) => subcategory['value'] == _subcategory) ??
          false
          ? _subcategory
          : null, // Ensuring _subcategory is valid
      onChanged: (value) {
        setState(() {
          _subcategory = value!;
        });
      },
      items: [
        DropdownMenuItem<String>(
          value: null,
          child: Text('Select Subcategory', style: TextStyle(color: Colors.grey)),
        ),
        if (selectedCategory['subcategories'] != null)
          ...selectedCategory['subcategories'].map<DropdownMenuItem<String>>((subcategory) {
            return DropdownMenuItem<String>(
              value: subcategory['value'].toString(),
              child: Text(subcategory['label'].toString()),
            );
          }).toList(),
      ],
      decoration: InputDecoration(
        labelText: 'Subcategory',
        border: OutlineInputBorder(),
      ),
    );
  }

  Widget _buildColorPicker() {
    return AlertDialog(
      title: Text('Pick a color'),
      content: SingleChildScrollView(
        child: ColorPicker(
          pickerColor: _currentColor,
          onColorChanged: (color) {
            setState(() {
              _currentColor = color;
            });
          },
          showLabel: true,
          pickerAreaHeightPercent: 0.8,
        ),
      ),
      actions: [
        TextButton(
          onPressed: _closeColorPicker,
          child: Text('Cancel'),
        ),
        TextButton(
          onPressed: _addColor,
          child: Text('Add'),
        ),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Add New Product'),
      ),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(16),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Display Seller Name
              Text(
                '$_sellerName',
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: TColors.primary),
              ),
              SizedBox(height: 16),

              // Basic Information Section
              Text(
                'Basic Information',
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
              ),
              SizedBox(height: 16),
              TextFormField(
                decoration: InputDecoration(labelText: 'Title'),
                onChanged: (value) => _handleChange('title', value),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter a title';
                  }
                  return null;
                },
              ),
              SizedBox(height: 16),
              TextFormField(
                decoration: InputDecoration(labelText: 'Brand'),
                onChanged: (value) => _handleChange('brand', value),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter a brand';
                  }
                  return null;
                },
              ),
              SizedBox(height: 16),
              ElevatedButton(
                onPressed: _handleFileChange,
                child: Text('Upload Images'),
              ),
              SizedBox(height: 16),
              Wrap(
                children: _imageUrls.map((url) {
                  return Stack(
                    children: [
                      Image.file(
                        File(url),
                        width: 100,
                        height: 100,
                        fit: BoxFit.cover,
                      ),
                      Positioned(
                        right: 0,
                        child: IconButton(
                          color: TColors.primary,
                          icon: Icon(Icons.close),
                          onPressed: () => _removeUploadedImage(_imageUrls.indexOf(url)),
                        ),
                      ),
                    ],
                  );
                }).toList(),
              ),
              SizedBox(height: 16),
              DropdownButtonFormField<String>(
                value: categories.any((category) => category['category'] == _category) ? _category : null,
                onChanged: (value) {
                  setState(() {
                    _category = value!;
                  });
                },
                items: [
                  DropdownMenuItem<String>(
                    value: null,
                    child: Text('Select Category', style: TextStyle(color: Colors.grey)),
                  ),
                  ...categories.map((category) {
                    return DropdownMenuItem<String>(
                      value: category['category'].toString(),
                      child: Text(category['label'].toString()),
                    );
                  }).toList(),
                ],
                decoration: InputDecoration(
                  labelText: 'Category',
                  border: OutlineInputBorder(),
                ),
              ),
              SizedBox(height: 16),
              _renderSubcategoryField(),
              SizedBox(height: 16),
              _renderSizeField(),
              SizedBox(height: 16),
              Text(
                'Colors',
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
              ),
              SizedBox(height: 16),
              ElevatedButton(
                onPressed: _openColorPicker,
                child: Text('Add Color'),
              ),
              SizedBox(height: 16),
              Wrap(
                spacing: 8,
                children: _colors.map((color) {
                  return Chip(
                    backgroundColor: Color(int.parse(color['hex']!.replaceFirst('#', '0xff'))),
                    label: Text(color['name']!),
                    deleteIcon: Icon(Icons.close),
                    onDeleted: () => _removeColor(_colors.indexOf(color)),
                  );
                }).toList(),
              ),
              SizedBox(height: 16),
              if (_showColorPicker) _buildColorPicker(),
              SizedBox(height: 16),
              Text(
                'Pricing & Inventory',
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
              ),
              SizedBox(height: 16),
              TextFormField(
                decoration: InputDecoration(labelText: 'Original Price'),
                onChanged: (value) => _handleChange('originalPrice', value),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter the original price';
                  }
                  return null;
                },
              ),
              SizedBox(height: 16),
              TextFormField(
                decoration: InputDecoration(labelText: 'Discounted Price'),
                onChanged: (value) => _handleChange('discountedPrice', value),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter the discounted price';
                  }
                  return null;
                },
              ),
              SizedBox(height: 16),
              TextFormField(
                decoration: InputDecoration(labelText: 'Quantity'),
                onChanged: (value) => _handleChange('quantity', value),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter the quantity';
                  }
                  return null;
                },
              ),
              SizedBox(height: 16),
              TextFormField(
                decoration: InputDecoration(labelText: 'Stock Alert Level'),
                onChanged: (value) => _handleChange('stockAlert', value),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter the stock alert level';
                  }
                  return null;
                },
              ),
              SizedBox(height: 16),
              Text(
                'Additional Information',
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
              ),
              SizedBox(height: 16),
              TextFormField(
                decoration: InputDecoration(labelText: 'Manufacturing Date'),
                onChanged: (value) => _handleChange('manufacturingDate', value),
              ),
              SizedBox(height: 16),
              TextFormField(
                decoration: InputDecoration(labelText: 'Warranty'),
                onChanged: (value) => _handleChange('warranty', value),
              ),
              SizedBox(height: 16),
              Text(
                'Product Highlights',
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
              ),
              SizedBox(height: 16),
              Column(
                children: _highlights.asMap().entries.map((entry) {
                  int index = entry.key;
                  String highlight = entry.value;
                  return Row(
                    children: [
                      Expanded(
                        child: TextFormField(
                          initialValue: highlight,
                          onChanged: (value) => _handleHighlightChange(index, value),
                          decoration: InputDecoration(labelText: 'Highlight ${index + 1}'),
                        ),
                      ),
                      IconButton(
                        icon: Icon(Icons.close),
                        onPressed: () => _removeHighlight(index),
                      ),
                    ],
                  );
                }).toList(),
              ),
              SizedBox(height: 16),
              ElevatedButton(
                onPressed: _addHighlight,
                child: Text('Add Highlight'),
              ),
              SizedBox(height: 16),
              Text(
                'Description & Shipping',
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
              ),
              SizedBox(height: 16),
              TextFormField(
                decoration: InputDecoration(labelText: 'Product Description'),
                onChanged: (value) => _handleChange('description', value),
                maxLines: 4,
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter a description';
                  }
                  return null;
                },
              ),
              SizedBox(height: 16),
              TextFormField(
                decoration: InputDecoration(labelText: 'Shipping Information'),
                onChanged: (value) => _handleChange('shippingInfo', value),
                maxLines: 3,
              ),
              SizedBox(height: 16),
              ElevatedButton(
                onPressed: _isSubmitting ? null : _submitForm,
                child: Text(_isSubmitting ? 'Adding Product...' : 'Add Product'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}